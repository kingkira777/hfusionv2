const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>{
    res.render('calendar/calendar',{
        title : 'Calendar',
        calActive : 'active'
    });
});






module.exports = router;