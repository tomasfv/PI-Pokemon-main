import React from "react";
import {useParams, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { getDetail, cleanDetail } from "../actions/index";
import { useEffect } from "react";
import './PokemonDetail.css'

export default function PokemonDetail(){
    const dispatch = useDispatch();
    const param = useParams();
    const history = useHistory();
    const myPokemon = useSelector ((state) => state.detail);
    
   

    useEffect(() => {
        dispatch(getDetail(param.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    function handleBack(e){
        e.preventDefault();
        dispatch(cleanDetail());
        history.push('/home');
    }

    return(
        <div className="background-detail">

        <div >
            {
                myPokemon.length > 0 ?
                <div className="details">
                    <h1 className="name-detail">{myPokemon[0].name}</h1>
                    <img src={myPokemon[0].img ? myPokemon[0].img :myPokemon[0].image} alt="" width="250px" height="250px"/>
                    <h2>Tipos: {myPokemon[0].createdInDb? myPokemon[0].types.map(p => p.name + " ") : myPokemon[0].type + " "}</h2>
                    <h2>Vida: {myPokemon[0].health}</h2>
                    <h2>Ataque: {myPokemon[0].attack}</h2>
                    <h2>Defensa: {myPokemon[0].defense}</h2>
                    <h2>Velocidad: {myPokemon[0].speed}</h2>
                    <h2>Tamaño: {myPokemon[0].height}cm</h2>
                    <h2>Peso: {myPokemon[0].weight}Kg</h2>

                    <h2>id: {myPokemon[0].id}</h2>                    
                </div> : <p>Loading...</p>
            }
            
                <button className="volver" onClick={ e => handleBack(e)}>volver</button>
        </div>
        </div>
    )

}