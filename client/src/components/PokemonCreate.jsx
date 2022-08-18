import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {postPokemon, getTypes} from '../actions/index';

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Se Requiere Un Nombre';
    }else if(!input.speed){
        errors.speed = 'Se Requiere Speed'
    }
}

export default function PokemonCreate(){
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state) => state.types);

    const [input, setInput] = useState({
        name:"",
        img:"",
        health: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        type: [],
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value,
        })
    }

    function handleSelect(e){
        setInput({
            ...input,
            type: [...input.type, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postPokemon(input))
        alert("Pokémon Creado Con Éxito!")
        setInput({
            name:"",
            img:"",
            health: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            type: [],
        });
        history.push('/home');      //llevame al home cuando se cree el pokemon
    }
    
    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);
    
    return(
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Creá Tu Pokémon</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input type='text' value={input.name} name='name' onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Imagen: </label>
                    <input type='text' value={input.img} name='img' onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Vida: </label>
                    <input type='number' value={input.health} name='health' onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Ataque: </label>
                    <input type='number' value={input.attack} name='attack' onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Defensa: </label>
                    <input type='number' value={input.defense} name='defense' onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Velocidad: </label>
                    <input type='number' value={input.speed} name='speed' onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Tamaño: </label>
                    <input type='number' value={input.height} name='height' onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Peso: </label>
                    <input type='number' value={input.weight} name='weight' onChange={(e) => handleChange(e)}/>
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    {types.map((t) => (
                        <option value={t.name}>{t.name}</option>
                    ))}
                </select>
                <ul><li>{input.type.map(el => el + ', ')}</li></ul>       {/*mostrar los tipos que voy seleccionando */}
                <button type='submit'>Crear Pokémon</button>
                
            </form>
        </div>
    )
}
