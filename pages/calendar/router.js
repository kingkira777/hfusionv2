const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>{
    if(!req.session.userid){
        res.redirect('/login');
        res.end();
    }
    
    res.render('calendar/calendar',{
        title : 'Calendar',
        calActive : 'active'
    });
});






module.exports = router;