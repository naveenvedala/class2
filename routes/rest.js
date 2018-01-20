const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send(req.headers)
})
    
router.get('/registration', (req, res)=>{
    res.send('Student Reg Us Page')
})

module.exports = router;