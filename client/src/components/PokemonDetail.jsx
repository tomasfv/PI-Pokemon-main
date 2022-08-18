import React from "react";
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";

export default function PokemonDetail(){
    const dispatch = useDispatch();
    const param = useParams();
   

    useEffect(() => {
        dispatch(getDetail(param.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const myPokemon = useSelector ((state) => state.detail)

    return(
        <div>
            {
                myPokemon.length > 0 ?
                <div>
                    <h1>{myPokemon[0].name}</h1>
                    <img src={myPokemon[0].img ? myPokemon[0].img :myPokemon[0].image} alt="" width="500px" height="700px"/>
                    <h2>Tipos {myPokemon[0].createdInDb? myPokemon[0].types.map(p => p.name + " ") : myPokemon[0].type + " "}</h2>
                    <h2>Vida {myPokemon[0].health}</h2>
                    <h2>Ataque {myPokemon[0].attack}</h2>
                    <h2>Defensa {myPokemon[0].defense}</h2>
                    <h2>Tamaño {myPokemon[0].height}cm</h2>
                    <h2>Peso {myPokemon[0].weight}Kg</h2>
                    <h2>id {myPokemon[0].id}</h2>                    
                </div> : <p>Loading...</p>
            }
            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div>
    )

}