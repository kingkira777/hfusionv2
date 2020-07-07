'use strict';
const con = require('../../modules/connection');
const master = require('../../modules/master');
const user = require('../users/users');

var Login = {



    // LOGIN USER=======================================
    login_user : (username, password) =>{
        var g = `SELECT * FROM users WHERE (username = ? OR  email = ?) AND password = ?`;
        var gVal = [username,username,password];
        return new Promise(resolve => {
            con.query(g,gVal, async (err,rs)=>{
                if(rs.length > 0){
                    var dis = await user.user_discipline(rs[0].user_id);
                    dis = (dis != "")? dis : rs[0].access_level; 
                    var data = {
                        userid : rs[0].user_id,
                        username : rs[0].username,
                        email : rs[0].email,
                        accesslvl : dis
                    };
                    resolve(data);
                }else{
                    resolve('failed');
                }
            });
        });
    }

};

module.exports = Login;