import axios from "axios";
// import { apiKey } from "../../utils/config";
let apiKey = "3d5e9979779544cd923520a82d0f3c88";

export function getVideogames() {
  return async function (dispatch) {
    let json = await axios("https://pi-videogames-6rep.onrender.com/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function getVideogamesByName(name) {
  return async function (dispatch) {
    try {
      let json = await axios(`https://pi-videogames-6rep.onrender.com/videogames?name=${name}`);
      return dispatch({
        type: "GET_VIDEOGAMES_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
    }
  };
}

export function getVideogameDetail(idGame, createdInDb) {
  return async function (dispatch) {
    try {
      
      if (createdInDb==='true') {
    
        let json = await axios(
          `https://pi-videogames-6rep.onrender.com/videogame/${idGame}`
        );
        console.log(json)
        const {
          id,
          name,
          Platforms,
          Genres,
          description,
          backgroundImage,
          rating,
          releaseDate,
        } = json.data[0];
        console.log(id,'id',name,'name')
        let newObj = {
          id,
          name,
          platforms:Platforms.map(p=>p.name),
          genres:Genres.map(g=>g.name),
          description,
          backgroundImage,
          rating,
          releaseDate,
        };
        console.log(newObj,'aca newObj')
        return dispatch({
          type: "GET_VIDEOGAME_DETAIL",
          payload: newObj,
        });
      }else if (createdInDb==='false'){
        console.log('entre2')
        let json = await axios(
        `https://api.rawg.io/api/games/${idGame}?key=${apiKey}`
      );
      const {
        id,
        name,
        platforms,
        genres,
        description_raw,
        background_image,
        rating,
        released,
      } = json.data;
      let newObj = {
        id,
        name,
        platforms:platforms.map(p=>p.platform.name),
        genres:genres.map(g=>g.name),
        description:description_raw,
        backgroundImage:background_image,
        rating,
        released,
      };
      return dispatch({
        type: "GET_VIDEOGAME_DETAIL",
        payload: newObj,
      });
    }
    } catch (error) {
      console.log(error.message, "Error en la consulta a la api");
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    let json = await axios(`https://pi-videogames-6rep.onrender.com/genres`);
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
  };
}

// export function getPlataforms() {
//   return async function (dispatch) {
//     let json = await axios(
//       `https://api.rawg.io/api/platforms?key=${apiKey}&ordering=games_count`
//     );
//     let newJson = json.data.results.slice(30, 50);
//     return dispatch({
//       type: "GET_PLATFORMS",
//       payload: newJson,
//     });
//   };
// }
export function getPlataforms() {
  return async function (dispatch) {
    let json = await axios(`https://pi-videogames-6rep.onrender.com/platforms`);
    return dispatch({
      type: "GET_PLATFORMS",
      payload: json.data,
    });
  };
}

export function createVideogame(newVideogame) {
  return async function (dispatch) {
    const response = await axios.post(
      `https://pi-videogames-6rep.onrender.com/videogames`,
      newVideogame
    );
    console.log(response, "respuesta de la creacion");
    return dispatch({ type: "CREATE_VIDEOGAME", payload: response });
  };
}

export function filterByGenre(genre) {
  return {
    type: "FILTER_BY_GENRE",
    payload: genre,
  };
}

export function filterByOrigin(origin) {
  return {
    type: "FILTER_BY_ORIGIN",
    payload: origin,
  };
}

export function orderByName(order) {
  return {
    type: "ORDER_BY_NAME",
    payload: order,
  };
}

export function orderByRating(order) {
  return {
    type: "ORDER_BY_RATING",
    payload: order,
  };
}
