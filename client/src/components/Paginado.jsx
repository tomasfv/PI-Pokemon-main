import React from "react";
import './Paginado.css';

export default function Paginado({pokemonsPerPage, allPokemons, paginado}){     //toda esta info llega del componente Home
    const pageNumbers = []     //1, 2, 3, 4

    for(let i = 0; i <= Math.ceil(allPokemons/pokemonsPerPage) - 1; i++){
        pageNumbers.push(i + 1)
    }

    return(
        <nav>
            <ul className="paginado" key='pag'> 
                { pageNumbers &&              //si pageNumbers es true, los mapeo y renderizo una lista con los nºs de página
                    pageNumbers.map(number => (
                    // <li className="number" key={number}>
                        //<a onClick={() => paginado(number)}>{number}</a>  {/* al clickear ejecuto paginado con ese nº como argumento */}
                        <button className="number" key={number} onClick={() => paginado(number)}>{number}</button>
                    //</li>
                ))}

            </ul>
        </nav>
    )
}