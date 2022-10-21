import React from 'react';
import "./LandingPage.css";
import { Link } from 'react-router-dom';


export default function LandingPage(){
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
                <img src='https://media.tenor.com/8sTMqGWjYAQAAAAC/ball-pokemon.gif'></img>
            </div>
        </div>
        
        
        
    )
}