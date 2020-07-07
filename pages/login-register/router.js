const express = require('express');
const router = express.Router();
const login = require('./login');
const { route } = require('../staff/router');

router.get('/?',(req,res)=>{
    var err = (req.query.err)? req.query.err : '';
    res.render('login-register/login',{
        title : 'Login',
        err : err
    });
    res.end();
});


// LOGOUT USER==========================================================
router.get('/logout',(req,res)=>{
    req.session.destroy(err => {
        res.redirect('/login');
        res.end();
    });
});



//LOGIN USER============================================================
router.post('/login-user',(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    login.login_user(username,password).then(e =>{
        if(e != "failed"){
            req.session.userid  = e.userid;
            req.session.username = e.username;
            res.redirect('/');
            res.end(); 
        }else{
            res.redirect('/login?err=1');
            res.end();
        }
    });
});



module.exports = router;