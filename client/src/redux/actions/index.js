import axios from "axios";

export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const POST_VIDEOGAME = "POST_VIDEOGAME";

const url = "http://localhost:3001";

//* TODOS LOS VIDEOGAMES
export function getAllGames() {
  return async function (dispatch) {
    var json = await axios.get(`${url}/videogames`);
    dispatch({
      type: GET_ALL_GAMES,
      payload: json.data,
    });
  };
}

//* TODOS LOS GÉNEROS
export function getAllGenres() {
  return async function (dispatch) {
    var json = await axios.get(`${url}/genres`);
    dispatch({
      type: GET_ALL_GENRES,
      payload: json.data,
    });
  };
}

//* CREAR NUEVO JUEGO
export function postVideogame(playload){
  return async function (dispatch){
    try {
      const post = await axios.get(`${url}/videogames`)
      return post
    } catch (error) {
      console.log(error);
    }
  }
}
