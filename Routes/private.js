const router = require('express').Router();
const verify = require('../verifytoken');

router.get('/posts', verify ,(req,res) => {
    res.json({Post: {title:'Private Data' , Description: 'This data is  confidentional only allowed to specific users'}});
});

module.exports = router;