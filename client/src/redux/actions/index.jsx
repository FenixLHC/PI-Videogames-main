import axios from "axios";
// import { apiKey } from "../../utils/config";
let apiKey='3d5e9979779544cd923520a82d0f3c88'

export function getVideogames() {
  return async function (dispatch) {
    let json = await axios("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function getVideogamesByName(name) {
  return async function (dispatch) {
    try {
      let json = await axios(`http://localhost:3001/videogames?name=${name}`)
      console.log("🚀 ~ file: index.jsx ~ line 17 ~ json", json.data)
      return dispatch({
        type: 'GET_VIDEOGAMES_BY_NAME',
        payload: json.data,
      })  
    } catch (error) {
      console.log(error.message,'Error en la consulta a la api')
    }
  }
}

export  function getVideogameDetail(id) {
  console.log("llegamo1");
  console.log(id);
  return async function (dispatch) {
    try {
      console.log("llegamo2");
      let json = await axios(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
      console.log(json.data[0], "console log json.data[0]");
      return dispatch({
        type: "GET_VIDEOGAME_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error.message,'Error en la consulta a la api')
    }
  }
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

export function getPlataforms(){
  return async function(dispatch){
    let json =await axios(`https://api.rawg.io/api/platforms?key=${apiKey}&ordering=games_count`);
    console.log("🚀 ~ file: index.jsx ~ line 61 ~ returnfunction ~ json", json)
    let newJson=json.data.results.slice(30,50);
    console.log("🚀 ~ file: index.jsx ~ line 63 ~ returnfunction ~ newJson", newJson)
    return dispatch({
      type:'GET_PLATFORMS',
      payload:newJson
    })
  }
}


export function createVideogame(newVideogame) {
  return async function(dispatch){
    const response =await axios.post(`http://localhost:3001/videogames`,newVideogame)
    console.log(response)
    return dispatch({ type: "CREATE_VIDEOGAME", payload: response })
  }
}

export function filterByGenre(genre) {
  return {
    type: 'FILTER_BY_GENRE',
    payload: genre,
  };
}

export function filterByOrigin(origin) {
  return {
    type: 'FILTER_BY_ORIGIN',
    payload: origin
  }
}

export function orderByName(order) {
  return {
    type: 'ORDER_BY_NAME',
    payload: order
  }
}

export function orderByRating(order) {
  return {
    type: 'ORDER_BY_RATING',
    payload: order
  }
}

