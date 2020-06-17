const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>{
    res.render('staff/staff',{
        title : 'Staff',
        staffActive : 'active'
    });
});






module.exports = router;