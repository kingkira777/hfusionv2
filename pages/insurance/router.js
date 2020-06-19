const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>{

    res.render('insurance/insurance',{
        title : 'Insurance',
        staffActive : 'active'
    });
    res.end();

});



module.exports = router;