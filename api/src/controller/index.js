//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { Sequelize } = require('sequelize');
const { Videogame, Genre, Op } = require('../db.js')
const { dbApiKey } = require('../utils/config');
const axios = require('axios');

//VIDEOGAMES///////////////////////////////////////////////////////////////////////////////////////////////

const getApiVgs = async () => {
    let vgs = [];
    for (let i = 1; i <= 5; i++) {
        const response = await axios(`https://api.rawg.io/api/games?key=${dbApiKey}&page=${i}`)
        const vg = await response.data.results.forEach(v => {
            const newObjet = {
                id: v.id,
                name: v.name,
                ratings: v.ratings,
                platforms: v.platforms.map(p => p.platform.name),
                released: v.released,
                genres: v.genres.map(g => g.name),
                image: v.background_image
            }
            vgs.push(newObjet)
        })
    }
    return vgs
}

const getDbVgs = async () => {
    const vgs = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
    return vgs
}

const getAllVgs = async () => {
    const api = await getApiVgs();
    const db = await getDbVgs();

    return api.concat(db)
}

const createVideogame = async (reqBody) => {
    try {
        const { name, description, rating, releaseDate, platforms,genre } = reqBody;

        let newVideogame = await Videogame.create({ name, description, rating, releaseDate, platforms })

        const genreDb=await Genre.findAll({
            where:{name:genre}
        })

        newVideogame.addGenre(genreDb)

        return newVideogame
    } catch (error) {
        console.log('salta error')
        return error.message
    }
}

//GENRES///////////////////////////////////////////////////////////////////////////////////////////////////
const getApiGenres = async () => {
    
    const response = await axios(`https://api.rawg.io/api/genres?key=${dbApiKey}`)
    const g = await response.data.results.forEach(g => {  
        Genre.findOrCreate({
            where: { name: g.name }
        })
    })
    const genres = await Genre.findAll()
    return genres
}

//ONE VIDEOGAME///////////////////////////////////////////////////////////////////////////////////////////////
const getOneVg = async (id) => {
    const vgs=await getAllVgs();
    const vg=(await vgs).filter(vg=>vg.id==id);
    return vg;
    // const vg = await Videogame.findAll({
    //     where:{id:id},
    //     include: {
    //         model: Genre,
    //         attributes: ['name'],
    //         through: {
    //             attributes: [],
    //         }
    //     }
    // });
    // return vgs
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
    getApiVgs,
    getDbVgs,
    getOneVg,
    getAllVgs,
    createVideogame,
    getApiGenres
}