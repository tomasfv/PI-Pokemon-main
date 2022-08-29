
const initialState = {
    pokemons: [],                                       //tiene los de la api y db
    allPokemons: [],                                    //estado que siempre tiene todos los pokemons
    types: [],
    detail: [],
};

function rootReducer(state = initialState, action) {    //el argumento action recibe la action despachada desde el actions creator.
    switch(action.type) {
        case "GET_POKEMONS":
            return{
                ...state,                               //copia de initialState
                pokemons: action.payload,               //piso la info que contenia pokemons:[] con un nuevo render de todos los pokemons
                allPokemons: action.payload             //Estado para traer info original siempre. 
            }
        case "FILTER_CREATED":
            const fullPokemons = state.allPokemons
            const createdFilter = action.payload === 'created' ?    //si el usuario selecciona created...
                    fullPokemons.filter(el => el.createdInDb) :     //guarda en fullPokemons solo los que tengan la prop createdInDb
                    fullPokemons.filter(el => !el.createdInDb)      //si selecciona otra cosa (api) guarda todos menos los creados en db
            return {
                ...state,
                pokemons: action.payload === 'All' ?            //si selecciona All guarda en pokemons todos los pokemons...        
                            state.allPokemons : createdFilter   //sino, guarda lo que haya en createdFilter (created/api)                
            }
        case "FILTER_TYPE":
            let fullPokemons2 = state.allPokemons
            let resultApi = fullPokemons2.filter(p => p.type && p.type.includes(action.payload))
            let resultDb = fullPokemons2.filter(p => p.types && p.types.map(t => t.name).includes(action.payload))
            let result = resultApi.concat(resultDb)
            return {
                ...state,
                pokemons: result
            }

        case "ORDER_BY_NAME":
            let sortedArr = action.payload === 'asc' ?
                state.pokemons.sort(function(a, b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) :
                state.pokemons.sort(function(a, b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    pokemons: sortedArr
                }
        case "ORDER_BY_ATTACK":
            let sortedAttack = action.payload === 'max' ?
                state.pokemons.sort(function(a, b){
                    if(a.attack < b.attack) {
                        return 1;
                    }
                    if(b.attack < a.attack) {
                        return -1;
                    }
                    return 0;
                }) :
                state.pokemons.sort(function(a, b){
                    if(a.attack < b.attack) {
                        return -1;
                    }
                    if(b.attack < a.attack) {
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    pokemons: sortedAttack
                }

        case "GET_TYPES":
            return{
                ...state,
                types: action.payload
            }
        case "POST_POKEMON":
            return{
                ...state,
            }
        case "GET_DETAILS":
            return{
                ...state,
                detail: action.payload
            }
        case "CLEAN_DETAIL":
            return{
                ...state,
                detail: []

            }    
        case "GET_NAME_POKEMONS":
                return{
                    ...state,
                    pokemons: action.payload
                }

        default:
            return state;
    }
}

export default rootReducer;