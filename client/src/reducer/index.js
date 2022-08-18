
const initialState = {
    pokemons: [],
    allPokemons: [],                                   //estado que siempre tiene todos pokemons
    types: [],
    detail: []
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case "GET_POKEMONS":
            return{
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload                 //Estado para traer info original siempre.
            }
        case "FILTER_CREATED":
            const allPokemons2 = state.allPokemons
            const createdFilter = action.payload === 'created' ? allPokemons2.filter(el => el.createdInDb) : allPokemons2.filter(el => !el.createdInDb)   
            return {
                ...state,
                pokemons: action.payload === 'All' ? state.allPokemons : createdFilter                
            }
        case "ORDER_BY_NAME":
            let sortedArr = action.payload === 'asc' ?
                state.pokemons.sort(function(a, b){
                    if(a.name > b.name) {
                        return 1;
                    }
                    if(b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.pokemons.sort(function(a, b){
                    if(a.name > b.name) {
                        return -1;
                    }
                    if(b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    pokemons: sortedArr
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