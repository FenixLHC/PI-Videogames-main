const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videoGamesRoutes = require('./videoGamesRoutes.js')
const genreRoutes = require('./genreRoutes.js')
const oneVgRoute = require('./oneVgRoute.js')
const platformsRoutes=require('./platformRoutes.js')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videoGamesRoutes);
router.use('/videogame', oneVgRoute);
router.use('/genres', genreRoutes)
router.use('/platforms',platformsRoutes)

router.get('/healthServer', async (req,res)=>{
    res.send('ok')
})

module.exports = router;
