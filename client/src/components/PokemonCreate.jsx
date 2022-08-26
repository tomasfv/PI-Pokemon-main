import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {postPokemon, getTypes} from '../actions/index';
import './PokemonCreate.css'

//FUNCIONES VALIDADORAS
function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'se requiere un nombre';
    }else if(!/^[A-z]+$/.test(input.name)){          //expresion regular solo acepta letras
        errors.name = 'solo se aceptan letras'
    }else if(!input.img){
        errors.img = 'se requiere una imagen';
    }else if(!/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(input.img)){ 
        errors.img = 'solo se aceptan URL'
    }else if(input.health < 1 || input.health > 200){
        errors.health = 'debe ser un valor entre 1 y 200'
    }else if(!/^[0-9]+$/.test(input.health)){ 
        errors.health = 'solo se aceptan números'
    }else if(input.attack < 1 || input.attack > 200){
        errors.attack = 'debe ser un valor entre 1 y 200'
    }else if(!/^[0-9]+$/.test(input.attack)){ 
        errors.attack = 'solo se aceptan números'
    }else if(input.defense < 1 || input.defense > 200){
        errors.defense = 'debe ser un valor entre 1 y 200'
    }else if(!/^[0-9]+$/.test(input.defense)){ 
        errors.defense = 'solo se aceptan números'
    }else if(input.speed < 1 || input.speed > 200){
        errors.speed = 'debe ser un valor entre 1 y 200'
    }else if(!/^[0-9]+$/.test(input.speed)){ 
        errors.speed = 'solo se aceptan números'
    }else if(input.height < 1 || input.height > 200){
        errors.height = 'debe ser un valor entre 1 y 200'
    }else if(!/^[0-9]+$/.test(input.height)){ 
        errors.height = 'solo se aceptan números'
    }else if(input.weight < 1 || input.weight > 200){
        errors.weight = 'debe ser un valor entre 1 y 200'
    }else if(!/^[0-9]+$/.test(input.weight)){ 
        errors.weight = 'solo se aceptan números'
    }else if(input.type.length > 2){
         errors.type = 'no puede tener mas de 2 tipos'
    }else if(input.type.length < 1){
        errors.type = 'no puede tener menos de 1 tipo'
    }
        return errors;
}

export default function PokemonCreate(){
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state) => state.types); //guardo en types el estado con todos los tipos
    const [errors, setErrors] = useState({e:''});      //creo el estado errors
    const [input, setInput] = useState({               //creo el estado input que inicialmente tiene todos los inputs vacios
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
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value,
        }));
    }

    function handleSelect(e){
        setInput({
            ...input,
            type: [...input.type, e.target.value],
        })
        console.log(input.type);
        setErrors(validate({
            ...input,
            type: [...input.type, e.target.value]
        }))
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

    function handleDelete(el){
        setInput({
            ...input,
            type: input.type.filter(t => t !== el)
        })
        console.log(input.type);
    }
    
    useEffect(() => {
        dispatch(getTypes());       //al montarse el comp me trae todos los tipos
    }, [dispatch]);
    
    return(
        <div className="back-create">
            <Link to='/home'><button className="volver-create">volver</button></Link>
            <h1 className="title-create">Crea Tu Pokémon</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="formulario">
                    <label>Nombre: </label>
                    <input type='text' value={input.name} name='name' onChange={(e) => handleChange(e)}/>
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div className="formulario">
                    <label>Imagen(URL): </label>
                    <input type='text' value={input.img} name='img' onChange={(e) => handleChange(e)}/>
                    {errors.img && <p className="error">{errors.img}</p>}
                </div>
                <div className="formulario">
                    <label>Vida: </label>
                    <input type='number' value={input.health} name='health' onChange={(e) => handleChange(e)}/>
                    {errors.health && <p className="error">{errors.health}</p>}
                </div>
                <div className="formulario">
                    <label>Ataque: </label>
                    <input type='number' value={input.attack} name='attack' onChange={(e) => handleChange(e)}/>
                    {errors.attack && <p className="error">{errors.attack}</p>}
                </div>
                <div className="formulario">
                    <label>Defensa: </label>
                    <input type='number' value={input.defense} name='defense' onChange={(e) => handleChange(e)}/>
                    {errors.defense && <p className="error">{errors.defense}</p>}
                </div>
                <div className="formulario">
                    <label>Velocidad: </label>
                    <input type='number' value={input.speed} name='speed' onChange={(e) => handleChange(e)}/>
                    {errors.speed && <p className="error">{errors.speed}</p>}
                </div>
                <div className="formulario">
                    <label>Tamaño: </label>
                    <input type='number' value={input.height} name='height' onChange={(e) => handleChange(e)}/>
                    {errors.height && <p className="error">{errors.height}</p>}
                </div>
                <div className="formulario">
                    <label>Peso: </label>
                    <input type='number' value={input.weight} name='weight' onChange={(e) => handleChange(e)}/>
                    {errors.weight && <p className="error">{errors.weight}</p>}
                </div>
                
                <div className="formulario">
                <select value='default' onChange={(e) => handleSelect(e)}>
                    <option value='default' disabled hidden>--type--</option>
                    {types.map((t) => (
                        <option value={t.name} key={t.name}>{t.name}</option>
                        ))}
                </select>

                </div>
                
                    {errors.type && <p className="error">{errors.type}</p>}
                <div className="type">
                    {input.type.map(el =>               //recorro type para renderizarlo
                         <div className="type-content" key={el}>
                            <p>{el}</p>
                            <button className="delete-type" type='button' onClick={() => handleDelete(el)}>x</button>
                         </div>
                    )}
                </div>
                <div className="create-button">
                    {Object.keys(errors).length ? <button className="not-ok" type='submit' disabled>Crear Pokémon</button> : 
                                                  <button className="ok" type='submit'>Crear Pokémon</button> }
                </div>
                
            </form>
        </div>
    )
}
