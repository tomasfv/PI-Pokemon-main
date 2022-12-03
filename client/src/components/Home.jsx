import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, filterCreated, orderByName, filterType, getTypes, orderByAttack} from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import PikachuGif from '../Imagenes/PikachuGif.gif'
import PokeballWhiteSpinner from '../Imagenes/PokeballWhiteSpinner.gif'

import './Home.css';

export default function Home(){
    const dispatch = useDispatch();
    const allPokemons = useSelector ((state) => state.pokemons); //40 de la api
    const types = useSelector((state) => state.types);         //traigo el estado types con todos los tipos que me traje con el useEffect
    const [loading, setLoading] = useState(false);

    const cambiarEstado = () => {
        setLoading(true);
        setTimeout(() =>{
            setLoading(false)
        }, 3000)
    }

    //PAGINADO.
    const [currentPage, setCurrentPage] = useState(1);                      //La Home abre en la primera página
    const [pokemonsPerPage, /*setPokemonsPerPage*/] = useState(12);             //Quiero 12 pokemons por página
    const [/*orden*/, setOrden] = useState("");
    const indexOfLastPokemon = currentPage * pokemonsPerPage   //12         //índice del último pokemon que tengo en la página
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage //0    //índice del primer pokemon
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) //pokemons en mi home. Array del estado.

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)      //setea la pag actual con el nº de página que le paso desde el componente Paginado
    }


    useEffect (() =>{                       //Manejo de ciclos de vida
        if(!allPokemons[0]){             //mantengo los filtros cuando monto el componente
            dispatch(getPokemons());        //cuando se monta el componente, me traigo todos los pokemons
            dispatch(getTypes());           //cuando se monta el componente, me traigo todos los types    
         }
    }, [dispatch]);

    function handleClick(e){            //Reset
        e.preventDefault();             //preventDefault para que cuando recargue no se rompa todo.
        dispatch(getPokemons())         // boton "volver a cargar todos los pokemons"
    };

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value)) //el value puede ser All/created/api    
    }

    function handleFilterType(e){
        dispatch(filterType(e.target.value))   //el value será el tipo seleccionado en las opciones del filtro
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));  //el value puede ser asc/desc 
        setCurrentPage(1);                      //empiezo en la pagina 1
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleAttackSort(e){
        e.preventDefault();
        dispatch(orderByAttack(e.target.value)); //el value puede ser asc/desc
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)

    }

    return (                                            //Renderizado del Componente
        <div className='prueba'>
            <div className='white'>
              <div className='first-navbar'>  
                <h1 className='titulo'>POKEMON WEB</h1>
                <div className='titulo-resp'>
                    <h1 className='titulo'>POKEMON</h1>
                    <h1 className='titulo'>WEB</h1>
                </div>
                <Link to='/pokemon'><button className='crear'>CREATE</button></Link>
              </div>  
                <SearchBar/>                         

            </div>
            <div>
                
            </div>
            <div>
              <div className='filt-bar'>     
                <select className='filter' value='default' onChange={e => handleSort(e)}>
                    <option value='default' disabled hidden>NAME</option>
                    <option value='asc'>A → Z</option>
                    <option value='Desc'>Z → A</option>
                </select>
                <select className='filter' value='default' onChange={e => handleAttackSort(e)}>
                    <option value='default' disabled hidden>ATTACK</option>
                    <option value='max'>+ ATTACK</option>
                    <option value='min'>- ATTACK</option>
                </select>
                <button className='reset' onClick={(e) => {handleClick(e); cambiarEstado()}}>
                    RESET
                </button>
                {loading && <img className='buscar-gif' src={PokeballWhiteSpinner} alt='busc'></img> }
                <select className='filter' value='default' onChange={e => handleFilterCreated(e)}>
                    <option value='default' disabled hidden>ORIGIN</option>
                    <option value='All'>All</option>
                    <option value='created'>CREATED</option>
                    <option value='api'>API</option> 
                </select>
                <select className='filter' value='default' onChange={e => handleFilterType(e)}>             {/* cuando seleccino un tipo, se ejecuta el handle */}
                    <option value='default' disabled hidden>TYPE</option>
                    {types.map((t) => (                                 //recorro el estado types y por cada tipo ...
                            <option value={t.name} key={t.name}>{t.name.toUpperCase()}</option>   //renderizo un option con el nombre de cada uno en el select
                        ))}
                </select>
            </div>
        
                <div>
                    <Paginado 
                        pokemonsPerPage = {pokemonsPerPage}     //le paso al comp paginado el estado pPP
                        allPokemons = {allPokemons.length}      //le paso el numero de la cantidad de elementos del array allPokemons
                        paginado = {paginado}                   //le paso la func paginado()
                    />
                </div>
                <div className='orden'>
                    {currentPokemons.length > 0 ?       //si el estado pokemons tiene algo...
                    currentPokemons?.map((p) => {       //recorro todos los pokemons
                         return (
                            <div key={p.name}>
                                <Link to={"/home/" + p.id} className='link'>
                                    <div>
                                        <Card                   //le paso al comp card:
                                            name={p.name} 
                                            image={p.img ? p.img : p.image} 
                                            types={p.createdInDb ? p.types.map(p => p.name + " ") : p.type.map(p => p + " " )} 
                                            // attack={p.attack}
                                            key={p.id}
                                        />  {/*Props de getApiInfo() en api/routes/index.js*/}
                                    </div>
                                </Link>
                            </div>
                            );
                        }) :    <div className='loading-pikachu'>    {/*sino, renderizo loading */}
                                    <img src={PikachuGif} alt='' width='350px' height='350px'/>  
                                </div> }
                            
                </div>
                <div className='paginado-resp'>
                    <Paginado 
                        pokemonsPerPage = {pokemonsPerPage}     //le paso al comp paginado el estado pPP
                        allPokemons = {allPokemons.length}      //le paso el numero de la cantidad de elementos del array allPokemons
                        paginado = {paginado}                   //le paso la func paginado()
                    />
                </div>
                </div>
        </div>
    )
}

//------------------------------------------------------------------------------------------------------------------















//---------------------------------------------------------------------------------------------------------------

//DELETE BUTTON

// function handleDelete(e){
    // dispatch(deletePokemon(e.target.value))   //el value será el id
    // }

{/* {p.createdInDb && <button type='button' value={p.id} onClick={e => handleDelete(e)}>X</button>} */}
