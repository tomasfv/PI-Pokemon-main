import React from "react";
import {useParams, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { getDetail, cleanDetail } from "../actions/index";
import { useEffect } from "react";
import { BsSpeedometer } from "react-icons/bs";
import { GiCrossedSwords, GiCheckedShield, GiHearts} from "react-icons/gi";
import { AiOutlineColumnHeight, AiOutlineNumber } from "react-icons/ai";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { MdCatchingPokemon } from "react-icons/md";
import './PokemonDetail.css'
import pokeballEye from '../Imagenes/pokeballEye.gif'

export default function PokemonDetail(){
    const dispatch = useDispatch();
    const param = useParams();
    const history = useHistory();
    const myPokemon = useSelector ((state) => state.detail);  //guardo en myPokemon el estado detail:[] del reducer
    
   

    useEffect(() => {
        dispatch(getDetail(param.id));                      //al montarse el componente despacho la accion getDetail con el id que capturo del URL dinamico
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    function handleBack(e){
        e.preventDefault();
        dispatch(cleanDetail());                        //al clickear en volver, reseteo el estado detail
        history.push('/home');
    }

    return(
        <div className="background-detail">

        <div >
            {
                myPokemon.length > 0 ?               //si el estado detail no está vacio, renderizo esto:
                <div className="details">
                    <h1 className="name-detail">{myPokemon[0].name.toUpperCase()}</h1>
                    <img src={myPokemon[0].img ? myPokemon[0].img :myPokemon[0].image} alt="img not found" width="250px" height="250px" className="detail-img"/>
                    <div className="stats">
                    <h2><MdCatchingPokemon/> TYPE: {myPokemon[0].createdInDb? myPokemon[0].types.map(p => p.name + " ") : myPokemon[0].type + " "}</h2>
                    <h2><GiHearts/> HP: {myPokemon[0].health}</h2>
                    <h2><GiCrossedSwords/> ATTACK: {myPokemon[0].attack}</h2>
                    <h2><GiCheckedShield/> DEFENSE: {myPokemon[0].defense}</h2>
                    <h2><BsSpeedometer/> SPEED: {myPokemon[0].speed}</h2>
                    <h2><AiOutlineColumnHeight/> HEIGHT: {myPokemon[0].height}</h2>
                    <h2><FaBalanceScaleLeft/> WEIGHT: {myPokemon[0].weight}</h2>
                    <h2><AiOutlineNumber/> ID: {myPokemon[0].id}</h2>                    
                    </div>
                </div> : <img src={pokeballEye} className="pokeball-gif"/>      //si está vacio, renderizo esto
            }
            
                <button className="volver" onClick={ e => handleBack(e)}>BACK</button>    {/*al clickear en volver ejecuto handleBack() */}
        </div>
        </div>
    )

}