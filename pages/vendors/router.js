const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>{

    res.render('vendors/vendors',{
        title : 'Vendors',
        staffActive : 'active'
    });
    res.end();

});



module.exports = router;