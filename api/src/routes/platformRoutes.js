const {Router} = require('express');
const { getPlataforms } = require('../controller');
const router=Router();

router.get('/',async (req,res)=>{
    try {
        const platforms= await getPlataforms()
        res.send(platforms)
    } catch (error) {
        res.send([error.message,'error getting platforms'])
    }
});

// router.post('/', async (req,res)=>{
//     try{
//         const platforms=await 
//     } catch (error){
//         res.send(error.message,'error posting platforms')
//     }
// })

module.exports=router;