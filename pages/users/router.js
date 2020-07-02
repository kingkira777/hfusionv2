const express = require('express');
const router = express.Router();
const con = require('../../modules/connection');
const master = require('../../modules/master');
const option = require('../../modules/opions');


var staffList = [];

router.use((req,res,next)=>{
    async function initOption(){
        var staffLst = await option.saffList();
        staffList = staffLst;


        next();
    }
    initOption();
});

// USER LIST
router.get('/',(req,res)=>{
    res.render('users/user-list',{
        title : 'User List',    
        staffActive : 'active',
    });
    res.end();
});


// Add Update User
router.get('/add-update',(req,res)=>{
    res.render('users/add-update',{
        title : 'Add/Update User',    
        staffActive : 'active',
        staffList : staffList
    });
    res.end();
});



module.exports = router;




