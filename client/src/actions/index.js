import axios from 'axios';

export function getPokemons(){
    return async function(dispatch){    //Acá es donde sucede toda la conexión entre el Front y el Back.
        var json = await axios.get("http://localhost:3001/pokemons", {});  //ruta del back que me muestra todos los pokemons
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}

export function getNamePokemons(name){
    return async function (dispatch){
        try{
            var json = await axios.get("http://localhost:3001/pokemons?name=" + name);
            return dispatch({
                type: "GET_NAME_POKEMONS",
                payload: json.data
            })
        }catch(error){
            return alert ('No se encontró el Pokémon')
        }
    }
}

export function getTypes(){                 //hace un request GET al back y trae todos los tipos de pokemon desde la db
    return async function(dispatch){
        var info = await axios.get("http://localhost:3001/types", {});  //trae [{id: 1, name: fighting}, {id:2, name: normal}, ...]
        return dispatch({
            type: "GET_TYPES",              //Despacha la action GET_TYPES con el array de objetos en formato .js
            payload: info.data           //info.data será lo que me trajo el axios ya en formato Javascript
        })
    }
}

export function postPokemon(payload){
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/pokemons", payload);
        return response;
    }
}

export function filterCreated(payload){         
    return{
        type: "FILTER_CREATED",         //Despacha la accion "FILTER_CREATED"
        payload,                        //El payload será lo que el usuario seleccione en el filtro.
    }
}

export function filterType(payload){
    return{
        type: "FILTER_TYPE",
        payload,
    }
}

export function orderByName(payload){
    return { 
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByAttack(payload){
    return {
        type: "ORDER_BY_ATTACK",
        payload
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/pokemons/' + id);
            return dispatch({ type: "GET_DETAILS", payload: json.data })
        }catch(error){
            console.log(error)
        }
    }
}

export function cleanDetail(){
    return {
        type: "CLEAN_DETAIL"
    }
}