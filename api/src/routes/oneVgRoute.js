const { Router } = require('express');
const router = Router();
const { getOneVg } = require('../controller')

router.get('/:idVideogame', async (req, res) => {
    const { idVideogame } = req.params;
    try {
        const vg = await getOneVg(idVideogame);
        vg.length ? res.json(vg) : res.status(404).send('Videogame not found / Videojuego no encontrado')
    } catch (error) {
        res.send([error.message,'Error getting videogame'])
    }
});

module.exports = router;