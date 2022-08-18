import React from "react";

export default function Paginado({pokemonsPerPage, allPokemons, paginado}){     //toda esta info llega del componente Home
    const pageNumbers = []

    for(let i = 0; i <= Math.ceil(allPokemons/pokemonsPerPage) - 1; i++){
        pageNumbers.push(i + 1)
    }

    return(
        <nav>
            <ul className="paginado"> 
                { pageNumbers &&
                    pageNumbers.map(number => (
                    <li className="number" key={number}>
                        <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}

            </ul>
        </nav>
    )
}