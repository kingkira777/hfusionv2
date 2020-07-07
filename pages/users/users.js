const con = require('../../modules/connection');
const master = require('../../modules/master');


let Users = {


    // DELETE USER
    user_delete: (userid) => {
        var d = `DELETE FROM users WHERE user_id = ?`;
        var dVal = [userid];
        return new Promise(resolve => {
            con.query(d, dVal, (err, rs) => {
                if (err) throw err;
                resolve('deleted');
            });
        });
    },

    //USER DATA
    user_data: (userid) => {
        var g = `SELECT * FROM users WHERE user_id = ?`;
        var gVal = [userid];
        return new Promise(resolve => {
            con.query(g, gVal, (err, rs) => {
                if (err) throw err;
                resolve(rs);
            });
        });
    },

    //USER TABLE LIST=================================================================
    user_table_list: () => {
        var users = [];
        var g = `SELECT * FROM users`;
        return new Promise(resolve => {
            con.query(g, async (err, rs) => {
                if (err) throw err;
                for(var key in rs){
                    var dis = await Users.user_discipline(rs[key].user_id);
                    var accesslvl = (dis && dis != "")? dis : rs[key].access_level;
                    var data = {
                        userid : rs[key].user_id,
                        name : rs[key].name,
                        username : rs[key].username,
                        email : rs[key].email,
                        access_level : accesslvl.toUpperCase(),
                    };
                    users.push(data);
                }
                resolve(users);
            });
        });
    },

    //USER DISCIPLINE===================================================================
    user_discipline : (userid) =>{
        var discipline = [];
        var g = `SELECT * FROM staff_professional_information WHERE staff_id = ?`;
        var gVal = [userid];
        return new Promise(resolve => {
            con.query(g,gVal,(err,rs)=>{
                if(err) throw err;
                for(var key in rs){
                    resolve(rs[key].discipline);
                }
                resolve(rs);
            });
        });
    },

    //UPDATE USER===========================================================
    update_user: (data) => {
        var u = `UPDATE users SET access_level = ?, name = ?, username = ?, password = ?, email = ? 
        WHERE user_id = ?`;
        var uVal = [data.accesslvl, data.name, data.username, data.password, data.email, data.userid];
        return new Promise(resolve => {
            con.query(u, uVal, (err, rs) => {
                if (err) throw err;
                resolve('updated');
            });
        });
    },

    //SAVE NEW USER=========================================================
    save_new_user: (data) => {
        var c = 'SELECT * FROM users WHERE email = ? OR username = ?';
        var cVal = [data.email, data.username];
        return new Promise(resolve => {
            con.query(c, cVal, (err, rs) => {
                if (err) throw err;
                if (rs.length > 0) {
                    resolve('existed');
                } else {

                    var cx = `SELECT * FROM users WHERE user_id = ?`;
                    var cxVal = [data.user_id];
                    con.query(cx, cxVal, (err, rs) => {
                        if (err) throw err;
                        if (rs.length > 0) {
                            var u = `UPDATE users SET access_level = ?, name = ?, username = ?, password = ?, email = ? 
                            WHERE user_id = ?`;
                            var uVal = [data.accesslvl, data.name, data.username, data.password, data.email, data.userid];
                            con.query(u, uVal, (err, rs) => {
                                if (err) throw err;
                                resolve('updated');
                            });
                        } else {
                            var s = `INSERT INTO users(user_id, access_level, name, username, password,
                                email) VALUES ?`;
                            var sVal = [
                                [data.userid, data.accesslvl, data.name, data.username, data.password, data.email]
                            ];
                            con.query(s, [sVal], (err, rs) => {
                                if (err) throw err;
                                resolve('saved');
                            });
                        }
                    });
                }
            });
        });
    }

};


module.exports = Users;










