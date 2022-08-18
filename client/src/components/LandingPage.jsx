import React from 'react';
import { Link } from 'react-router-dom';


export default function LandingPage(){
    return(
        <div>
            <h1>Esta es la Landing Page del PI-Pokémon</h1>
            <Link to ='/home'>
                <button>INGRESAR</button>
            </Link>
            
        </div>
        
    )
}