import { getRating } from "../../utils";

const initialState = {
    videogames: [],
    allVideogames: [],
    videogameDetail: {},
    videogameCreated: {},
    genres: [],
    platforms:[],
}

export default function rootReducer(state = initialState, action) {

    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state, videogames: action.payload, allVideogames: action.payload
            };
        case 'GET_VIDEOGAME_DETAIL':
            return {
                ...state, videogameDetail: action.payload
            };
        case 'GET_VIDEOGAMES_BY_NAME':
            return {
                ...state, videogames: action.payload
            }
        case 'GET_GENRES':
            return {
                ...state, genres: action.payload
            };
        case 'GET_PLATFORMS':
            return {
                ...state, platforms:action.payload
            }
        case 'CREATE_VIDEOGAME':
            return {
                ...state, videogameCreated: action.payload
            };
        case 'FILTER_BY_GENRE':
            {
                const allVideogames = state.allVideogames;
                const genreFiltered = action.payload === 'All' ? allVideogames : allVideogames.filter(v => v.genres?.includes(action.payload) === true)
                return {
                    ...state, videogames: genreFiltered
                }
            };
        case 'FILTER_BY_ORIGIN':
            {
                const allVideogames = state.allVideogames;
                const originFiltered = action.payload === 'Created' ? allVideogames.filter(v => v.createdInDb) : allVideogames.filter(v => !v.createdInDb)
                return {
                    ...state, videogames: action.payload === 'All' ? allVideogames : originFiltered
                }
            };
        case 'ORDER_BY_NAME':
            {
                const allVideogames = state.allVideogames;
                const videogames = state.videogames;
                let sortedVgs=[];
                if (action.payload === 'asc') {
                    sortedVgs = videogames.sort(function (a, b) {
                        if (a.name > b.name) return 1
                        if (a.name < b.name) return -1
                        return 0
                    })
                } else if (action.payload === 'desc') {
                    sortedVgs = videogames.sort(function (a, b) {
                        if (a.name < b.name) return 1
                        if (a.name > b.name) return -1
                        return 0
                    })
                }
                return {
                    ...state, videogames: action.payload === 'default' ? allVideogames : sortedVgs
                }
            };
        case 'ORDER_BY_RATING':
            {
                const allVideogames = state.allVideogames;
                const videogames = state.videogames;
                let sortedVgs = action.payload === 'ascRating' ? state.videogames.sort(function (a, b) {
                    if (getRating(a.ratings) > getRating(b.ratings)) return 1
                    if (getRating(a.ratings) < getRating(b.ratings)) return -1
                    return 0
                }) : state.videogames.sort(function (a, b) {
                    if (getRating(a.ratings) < getRating(b.ratings)) return 1
                    if (getRating(a.ratings) > getRating(b.ratings)) return -1
                    return 0
                })
                return {
                    ...state, videogames: action.payload === 'default' ? allVideogames : sortedVgs
                }
            }
        default:
            return { ...state }
    }
}

// {
//     const allVideogames = state.allVideogames;
//     const videogames = state.videogames;
//     let sortedVgs = action.payload === 'ascRating' ? state.videogames.sort(function (a, b) {
//         if (getRating(a.ratings) > getRating(b.ratings)) return 1
//         if (getRating(a.ratings) < getRating(b.ratings)) return -1
//         return 0
//     }) : state.videogames.sort(function (a, b) {
//         if (getRating(a.ratings) < getRating(b.ratings)) return 1
//         if (getRating(a.ratings) > getRating(b.ratings)) return -1
//         return 0
//     })
//     return {
//         ...state, videogames: action.payload === 'default' ? allVideogames : sortedVgs
//     }
// }