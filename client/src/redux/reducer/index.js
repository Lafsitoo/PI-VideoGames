import { GET_ALL_GAMES, GET_ALL_GENRES, POST_VIDEOGAME } from "../actions";

//* ESTADOS INICIALES
const initialState = {
  videogames: [],
  genres: [],
};

//* ROOT (Store)
const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_GAMES: 
        return {
            ...state,
            videogames: action.payload
        }

        case GET_ALL_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        
        case POST_VIDEOGAME:
            return {
                ...state,
            }

        default:
            return state
    }
};

export default rootReducer;
