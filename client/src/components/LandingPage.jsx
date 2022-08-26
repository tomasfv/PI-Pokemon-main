import React from 'react';
import "./LandingPage.css";
import { Link } from 'react-router-dom';


export default function LandingPage(){
    return(

        <div className='img'>
            <div className='text'>
                <div>
                    <h1>Bienvenidos a Pokémon Web</h1>
                    <Link to ='/home'>
                    <button className='button'>INGRESAR</button>
                    </Link>
                </div>   
            </div>
        </div>
        
        
        
    )
}