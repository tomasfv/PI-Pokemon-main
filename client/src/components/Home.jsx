import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, filterCreated, orderByName } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';

export default function Home(){
    const dispatch = useDispatch();
    const allPokemons = useSelector ((state) => state.pokemons);
    //PAGINADO.
    const [currentPage, setCurrentPage] = useState(1);                      //La Home abre en la primera página
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);             //Quiero 12 pokemons por página
    const [orden, setOrden] = useState("");
    const indexOfLastPokemon = currentPage * pokemonsPerPage   //12         //índice del último pokemon que tengo en la página
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage //0    //índice del primer pokemon
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) //pokemons en mi home. Array del estado.

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect (() =>{                       //Manejo de ciclos de vida
        dispatch(getPokemons());
    }, [dispatch]);

    function handleClick(e){            //Reset
        e.preventDefault();             //preventDefault para que cuando recargue no se rompa todo.
        dispatch(getPokemons())
    };

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)

    }


    return (                                            //Renderizado del Componente
        <div>
            <Link to='/pokemon'>Crear Pokémon</Link>
            <h1>NOMBRE DE LA WEB POKEMON</h1>
            <button onClick={ e => {handleClick(e)}}>
                Volver a Cargar Todos Los Pokemons
            </button>
            <div>
                <select onChange={e => handleSort(e)}>
                    <option value='asc'>Ascendente</option>
                    <option value='Desc'>Descendente</option>
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value='All'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existentes</option> 
                </select>
                <Paginado
                    pokemonsPerPage = {pokemonsPerPage}
                    allPokemons = {allPokemons.length}
                    paginado = {paginado}
                />
                <SearchBar/>  
                    { currentPokemons?.map((p) => {     
                        return (
                            <fragment>
                                <Link to={"/home/" + p.id}>
                                    <Card 
                                        name={p.name} 
                                        image={p.img ? p.img : p.image} 
                                        types={p.createdInDb ? p.types.map(p => p.name + " ") : p.type +" "} 
                                        key={p.id}
                                    />  {/*Props de getApiInfo() en api/routes/index.js*/}
                                </Link>
                            </fragment>
                            );
                        })}
            </div>
        </div>
    )
}