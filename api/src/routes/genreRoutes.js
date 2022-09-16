const { Router } = require('express');
const { getApiGenres } = require('../controller');
const router = Router();

router.get('/', async (req, res) => {
    // const { name } = req.query;
    // try {
    //     if (!name) {
    //         const videogames = await getAllVgs()
    //         res.send(videogames)
    //     } else {
    //         const videogames = await (await getAllVgs()).filter(vgs => vgs.name.toLowerCase().includes(name.toLowerCase()));
    //         videogames.length ? res.send(videogames) : res.status(404).send('There is not videogames with that name / No existen videojuegos con ese nombre')
    //     }
    // } catch (error) {
    //     res.send(error.message)
    // }
    try {
        const genres= await getApiGenres()
        res.send(genres)
    } catch (error) {
        res.send(error.message)
    }

});

router.post('/', async (req, res) => {
    try {
        const newVideogame = await createVideogame(req.body);
        res.status(201).json(newVideogame)
    } catch (error) {
        res.status(400).send(error.message)
    }
});
module.exports = router