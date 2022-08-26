import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemons } from '../actions';
import './SearchBar.css'

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!name){
            return('no se encontró')
        }
        dispatch(getNamePokemons(name))
    }

    return(
        <div>
            <input className='input-buscar' type = 'text' placeholder = 'Buscar...' onChange={(e) => handleInputChange(e)} />
            <button className='buscar' type = 'submit' onClick={(e) => handleSubmit(e)}>Buscar</button>

        </div>
    )
}

/*
1º guardo en name lo que el usuario escribe en el input a traves setName().
2º cuando el usuario haga click en Buscar le paso al back la acción getNamePokemons() con name como arg.
*/