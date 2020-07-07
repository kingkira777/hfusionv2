const express = require('express');
const router = express.Router();
const mail = require('../../modules/mail');

router.get('/',(req,res,next)=>{
    if(!req.session.userid){
        res.redirect('/login');
        res.end();
    }
    
    
    res.render('dashboard/dahsboard',{
        title : 'Dashboard',
        dashActive : 'active'
    });
});


router.get('/mail',(req,res)=>{
    mail().then(e => {
        res.send(e);
        res.end();
    });
});



module.exports = router;