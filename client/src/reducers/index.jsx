const initialState = {
    videogames: [],
    allVideogames: [],
    videogameDetail: {},
    videogameCreated: {},
    genres: []
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
        case 'CREATE_VIDEOGAME':
            return {
                ...state, videogameCreated: action.payload
            };
        case 'GET_GENRES':
            return {
                ...state, genres: action.payload
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
                
            }
        default:
            return { ...state }
    }
}