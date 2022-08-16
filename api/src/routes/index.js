const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Tipo, Pokemon } = require('../db');

const e = require('express');
//const Pokemon = require('../models/Pokemon');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//FUNCIONES CONTROLADORAS: Me traen info (getApiInfo() de la Api, getDbInfo() de la db) 

const getApiInfo = async () => {
    const pokeUrl = []; 
    const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40'); //obtengo name + url de los primeros 40 
    
    apiUrl.data.results.forEach(el => {
        pokeUrl.push(axios.get(el.url).then(resp => resp.data));    //pusheo el contenido de la url de c/pokemon
    });

    const apiInfo = Promise.all(pokeUrl)
    .then(res => res.map(p => {
        const info = {
            id: p.id,
            name: p.name,
            img: p.sprites.other.dream_world.front_default,
            type: p.types.map(el => el.type.name),
            health: p.stats[0].base_stat,
            attack: p.stats[1].base_stat,
            defense: p.stats[2].base_stat,
            height: p.height,
            weight: p.weight,
        }
        return info;
    }))
    return await apiInfo;
}

const getDbInfo = async () => {
    return await Pokemon.findAll({          //traeme todos los pokemon y ademas...
        include: {
            model: Tipo,                    //incluí el modelo Tipo con atributo nombre
            attributes: ['name'],
            through: {                      //"mendiante los atributos" (comprobacion que va siempre)
                attributes: [],
            },
        }
    })
}

const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;  //pokemons de la api concatenados a los de la db
}

//RUTAS

// GET/pokemons y /pokemons?name="..."
router.get('/pokemons', async(req, res) => {
    const name = req.query.name;
    let pokemonsTotal = await getAllPokemons(); //me traigo todos los pokemons

    if(name){
        let pokemonName = pokemonsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase())) //filtrame el pokemon cuyo name coincida con el name que me pasan por query.
        pokemonName.length ? res.status(200).send(pokemonName) : res.status(404).send('No está el Pokemon');
    } else {   //si no hay un query... (/pokemons)
        res.status(200).send(pokemonsTotal) //devuelvo todos los pokemons
    }
});

// GET/types
router.get('/types', async(req, res) => {
    const apiUrl = await axios.get('https://pokeapi.co/api/v2/type') //accedo al endpoint de type
    const types = apiUrl.data.results.map(el => el.name)             //me guardo el nombre de de c/tipo en el array types
    types.forEach(t => {            //recorro el array y por c/elm creo una entrada en la db Tipo
        Tipo.findOrCreate({         //.findOrCreate() si encuentra el tipo, lo muestra en la db y si no, lo crea en la db. Si uso .create() cada vez que haga una peticion me creará los 20 tipos.
            where: {
                name: t,
            }
        })
    });

    const allTypes = await Tipo.findAll();  //guardo todo lo que haya en la db Tipo.
    res.send(allTypes);  //devuelvo solo la info de la db. Con esto me evito recorrer la api en cada peticion
})

// POST /pokemons
router.post('/pokemons', async(req, res) => {
    const { name, health, attack, defense, speed, height, weight, type, createdInDb } = req.body;

    let pokemonCreated = await Pokemon.create({
        name, 
        health, 
        attack, 
        defense, 
        speed, 
        height, 
        weight,  
        createdInDb
    }) 

    let typeDb = await Tipo.findAll({   //dentro del modelo Tipo encontra todos los tipos...
        where: {            //cuyo name coincidan con el de type que recibo por body.
            name: type,
        }
    })

    pokemonCreated.addTipo(typeDb);  //al pokemon creado le agrego el tipo que lo traigo de la db (.addTipo() metodo de sequelize)
    res.send('Pokémon creado con éxito!')
})

// GET /pokemons/{idPokemon}

router.get('/pokemons/:id', async(req, res) => {
    const { id } = req.params;
    const pokemonsTotal = await getAllPokemons();

    if(id){
        let pokeId = await pokemonsTotal.filter(p => p.id == id)
        pokeId.length? res.status(200).json(pokeId) : res.status(404).send('No se encontró el Pokémon') 
    }
})




module.exports = router;
