import React from 'react';
import "./LandingPage.css";
import { Link } from 'react-router-dom';
import { getPokemons, getTypes } from '../actions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PokeballSpinning from '../Imagenes/PokeballSpinning.gif'


export default function LandingPage(){

    const dispatch = useDispatch();

    useEffect (() =>{ 
        dispatch(getPokemons());
        dispatch(getTypes());
    });

    return(

        <div className='landing-container'>
            <div className='text-container'>
                <div className='landing-text'>
                     <h1>WELCOME</h1>
                </div>
                <div>
                    <Link to ='/home'>
                        <button className='landing-button'>HOME</button>
                    </Link>
                </div>
            </div>
            <div className='landing-img'>
                <img src={PokeballSpinning} alt=''></img>
            </div>
        </div>
        
        
        
    )
}