import React from 'react';
import './Card.css';





export default function Card({ name, image, types}){
    


    return (
        <div className='card' >
            <h3>{name}</h3>
            <h5>{types}</h5>
            <img className='poke-img' src={image} alt='img not found' />
        </div>

    );
}