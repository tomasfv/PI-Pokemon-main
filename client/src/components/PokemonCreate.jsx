import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {postPokemon, getTypes} from '../actions/index';
import './PokemonCreate.css'
import swal from'sweetalert2';


//FUNCION VALIDADORA
function validate(input){                            //va a recibir el estado input con los cambios detectados por los handlers
    let errors = {};                                 //objeto que guarda todos los errores
    if(!input.name){                                //si no hay un nombre...
        errors.name = 'se requiere un nombre';      //al obj errors le agrego una prop name: 'se requiere un nombre'
    }else if(!/^[A-z]+$/.test(input.name)){          //expresion regular solo acepta letras
        errors.name = 'solo se aceptan letras'
    }else if(!input.img){
        errors.img = 'se requiere una imagen';
    }else if(!/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(input.img)){ 
        errors.img = 'solo se aceptan URL'
    }else if(input.health < 1 || input.health > 200){
        errors.health = 'debe ser un valor entre 1 y 200'
    }else if(!/^[0-9]+$/.test(input.health)){ 
        errors.health = 'solo se aceptan números'
    }else if(input.attack < 1 || input.attack > 200){
        errors.attack = 'debe ser un valor entre 1 y 200'
    }else if(!/^[0-9]+$/.test(input.attack)){ 
        errors.attack = 'solo se aceptan números'
    }else if(input.defense < 1 || input.defense > 200){
        errors.defense = 'debe ser un valor entre 1 y 200'
    }else if(!/^[0-9]+$/.test(input.defense)){ 
        errors.defense = 'solo se aceptan números'
    }else if(input.speed < 1 || input.speed > 200){
        errors.speed = 'debe ser un valor entre 1 y 200'
    }else if(!/^[0-9]+$/.test(input.speed)){ 
        errors.speed = 'solo se aceptan números'
    }else if(input.height < 1 || input.height > 200){
        errors.height = 'debe ser un valor entre 1 y 200'
    }else if(!/^[0-9]+$/.test(input.height)){ 
        errors.height = 'solo se aceptan números'
    }else if(input.weight < 1 || input.weight > 200){
        errors.weight = 'debe ser un valor entre 1 y 200'
    }else if(!/^[0-9]+$/.test(input.weight)){ 
        errors.weight = 'solo se aceptan números'
    }else if(input.type.length < 1){
        errors.type = 'no puede tener menos de 1 tipo'
    }
        return errors;      //se retorna el obj errors con la prop y el string correspondiente. let errors = {name: 'se requiere un nombre'}
}

export default function PokemonCreate(){
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state) => state.types); //guardo en types el estado con todos los tipos
    const [errors, setErrors] = useState({e:''});      //creo el estado errors
    const [input, setInput] = useState({               //creo el estado input que es como viene el formulario por default
        name:"",
        img:"",
        health: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        type: [],
    })

    function handleChange(e){                       //recibe un evento, que es un cambio en el input
        setInput({                                  //setInput es la funcion que sabe como modificar el estado input
            ...input,
            [e.target.name] : e.target.value,       //a la prop que coincida con el name(name, img, speed...) le asigna el valor que se escribió en el input   
        })
        setErrors(validate({                        //cuando haya un cambio, setea el estado errors con el resultado de pasarle a la funcion validate el input modificado. el estado errors podria ser errors = {name: 'se requiere un nombre'} por ej. 
            ...input,
            [e.target.name] : e.target.value,
        }));
    }

    function handleSelect(e){                       //recibe el tipo que se seleccionó en el selector
        if(!input.type.includes(e.target.value)){   //evita que se repitan los tipos
            setInput({
                ...input,
                type: [...input.type, e.target.value],  //al array de la prop type le añade el nuevo tipo que se seleccionó
            })
        }
        setErrors(validate({                        
            ...input,
            type: [...input.type, e.target.value]
        }))
        
    }

    function handleSubmit(e){                       //recibe toda la info del formulario
        e.preventDefault();
        dispatch(postPokemon(input))                //crea un pokemon con la info que se fue guardando en el estado input
        //alert("Pokémon Creado Con Éxito!")
        swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Pokémon Created!',
            showConfirmButton: false,
            timer: 2000,
          })
        setInput({                                  //resetea el estado input a su estado original
            name:"",
            img:"",
            health: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            type: [],

        });
        history.push('/home');      //llevame al home cuando se cree el pokemon
    }

    function handleDelete(el){      //recibe un evento, que es el click en la X de un tipo
        setInput({
            ...input,
            type: input.type.filter(t => t !== el)   //se filtra el array de la prop type, dejando pasar solo aquellos tipos que no coinciden con el clickeado 
        })
        
    }
    
    useEffect(() => {
        dispatch(getTypes());       //al montarse el comp me trae todos los tipos
    }, [dispatch]);
    
    return(
        <div className="back-create">
            <Link to='/home'><button className="volver-create">BACK</button></Link>
            <h1 className="title-create">CREATE  YOUR  POKÉMON</h1>
            <form onSubmit={(e) => handleSubmit(e)}>    {/*al clickear el boton de L188 se ejecuta handleSubmit*/}
                <div className="formulario">
                    <label>Nombre: </label>
                    <input type='text' value={input.name} name='name' maxLength="22" placeholder="nombre..." onChange={(e) => handleChange(e)}/> {/*Cuando hay un cambio en el input Nombre se ejecuta handleChange */}
                    {errors.name && <p className="error">{errors.name}</p>}    {/*si el estado errors tiene la prop name, renderizo un parrafo con el string de ésta prop */}
                </div>
                <div className="formulario">
                    <label>Imagen(URL): </label>
                    <input type='text' value={input.img} name='img' placeholder="imagen..." onChange={(e) => handleChange(e)}/>
                    {errors.img && <p className="error">{errors.img}</p>}
                </div>
                <div className="formulario">
                    <label>Vida: </label>
                    <input type='number' value={input.health} name='health' onChange={(e) => handleChange(e)}/>
                    {errors.health && <p className="error">{errors.health}</p>}
                </div>
                <div className="formulario">
                    <label>Ataque: </label>
                    <input type='number' value={input.attack} name='attack' onChange={(e) => handleChange(e)}/>
                    {errors.attack && <p className="error">{errors.attack}</p>}
                </div>
                <div className="formulario">
                    <label>Defensa: </label>
                    <input type='number' value={input.defense} name='defense' onChange={(e) => handleChange(e)}/>
                    {errors.defense && <p className="error">{errors.defense}</p>}
                </div>
                <div className="formulario">
                    <label>Velocidad: </label>
                    <input type='number' value={input.speed} name='speed' onChange={(e) => handleChange(e)}/>
                    {errors.speed && <p className="error">{errors.speed}</p>}
                </div>
                <div className="formulario">
                    <label>Tamaño: </label>
                    <input type='number' value={input.height} name='height' onChange={(e) => handleChange(e)}/>
                    {errors.height && <p className="error">{errors.height}</p>}
                </div>
                <div className="formulario">
                    <label>Peso: </label>
                    <input type='number' value={input.weight} name='weight' onChange={(e) => handleChange(e)}/>
                    {errors.weight && <p className="error">{errors.weight}</p>}
                </div>
                
                <div className="formulario">
                    { input.type.length < 2 ?     
                        <select value='default' onChange={(e) => handleSelect(e)}>     {/*Cuando se selecciona una opcion se ejecuta handleSelect con esa selección*/}
                            <option value='default' disabled hidden>--type--</option>
                            {types.map((t) => (                         //RECORRO EL ARRAY types PARA RENDERIZARLO
                            <option value={t.name}>{t.name}</option>    //renderizo los nombres de tipos en el selector
                            ))} 
                        </select> 
                        : <p className="error">no puede tener mas de 2 tipos</p>}

                </div>
                    {errors.type && <p className="error">{errors.type}</p>}   {/*si el estado errors tiene la prop type, renderizo un parrafo con el string de ésta prop */}
                
                <div className="type">
                    {input.type.map(el =>                               //Recorro el array de la prop type del input           
                         <div className="type-content">       {/*renderizo el tipo que ya fue seleccionado mas un boton X*/}
                            <p>{el}</p>                                         
                            <button className="delete-type" type='button' onClick={() => handleDelete(el)}>x</button>     {/*cuando clickeo en X se ejecuta handleDelete*/}
                         </div>
                    )}
                </div>
                <div className="create-button">
                    {Object.keys(errors).length || !input.type.length ? 
                        <button className="not-ok" type='submit' disabled>please complete the form</button> : 
                        <button className="ok" type='submit'>CREATE</button> }               {/*cuando clickeo el boton (que es tipo submit), se 'envia' el formulario L125  */}
                </div>
                
            </form>
            {console.log(input.type)}
        </div>
    )
     
}
