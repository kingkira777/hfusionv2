const express = require('express');
const router = express.Router();
const master = require('../../modules/master');
const option = require('../../modules/opions');
const users = require('./users');

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
    if(!req.session.userid){
        res.redirect('/login');
        res.end();
    }
    

    res.render('users/user-list',{
        title : 'User List',    
        staffActive : 'active',
    });
    res.end();
});




// ADD/UPDATE USER
router.get('/add-update?',(req,res)=>{
    if(!req.session.userid){
        res.redirect('/login');
        res.end();
    }
    

    var userid = (req.query.id)? req.query.id : "";
    users.user_data(userid).then(e => {
        console.log(staffList);
        res.render('users/add-update',{
            title : 'Add/Update User',    
            staffActive : 'active',
            staffList : staffList,
            data : e
        });
        res.end();
    });
});



//USER TABLE LIST
router.get('/user-table-list',(req,res)=>{
    if(!req.session.userid){
        res.redirect('/login');
        res.end();
    }
    

    users.user_table_list().then(e=>{
        res.json(e);
        res.end();
    });
});

// SAVE UPDATE USER
router.post('/save-update-user',(req,res)=>{
    if(!req.session.userid){
        res.redirect('/login');
        res.end();
    }
    
    
    var userid = (req.body.discipline && req.body.discipline != "")? req.body.discipline : master.UniqueID();
    var accesslevel = (req.body.accesslevel && req.body.accesslevel != "")? req.body.accesslevel : "";
    var data = {
        userid : userid,
        accesslvl : accesslevel,
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    }
    users.save_new_user(data).then(e => {
        res.json({
            message : e
        });
        res.end();
    });
});





module.exports = router;




