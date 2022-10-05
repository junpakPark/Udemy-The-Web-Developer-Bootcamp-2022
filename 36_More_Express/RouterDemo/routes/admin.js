const express = require('express')
const router = express.Router();

router.use((req, res, next)=>{
    if(req.query.isAdmin){
        next();
    }
    res.send("Sorry Not an admin")
})

router.get('/topsecret', (req, res) => {
    res.send('This is TOP SECRET')
})

router.get('/deleteeverything', (req, res) => {
    res.send('ok deleted it all')
})

module.exports = router;