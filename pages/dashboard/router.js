const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>{
    res.render('dashboard/dahsboard',{
        title : 'Dashboard',
        dashActive : 'active'
    });
});






module.exports = router;