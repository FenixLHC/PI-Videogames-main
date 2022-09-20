import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    let json = await axios("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export async function getVideogameDetail(id) {
  console.log("llegamo1");
  console.log(id);
  return (async function (dispatch) {
    console.log("llegamo2");
    let json = await axios(`http://localhost:3001/videogame/${id}`);
    console.log(json.data[0], "console log json.data[0]");
    return dispatch({
      type: "GET_VIDEOGAME_DETAIL",
      payload: json.data[0],
    });
  });
}

export function createVideogame(newVideogame) {
  return { type: "CREATE_VIDEOGAME", payload: newVideogame };
}

export function getGenres() {
  return async function (dispatch) {
    let json = await axios(`http://localhost:3001/genres`);
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
  };
}

export function filterByGenre(genre) {
  return {
    type: 'FILTER_BY_GENRE',
    payload: genre,
  };
}

export function filterByOrigin(origin){
    return {
        type: 'FILTER_BY_ORIGIN',
        payload:origin
    }
}

export function orderByName(name){
    return{
        type: 'ORDER_BY_NAME',
        payload:name
    }
}
