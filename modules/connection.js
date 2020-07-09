const mysql = require('mysql');

//SERVER HOST
let conServer = () => {
    var _con;
    _con = mysql.createPool({
        host: 'localhost',
        user: 'hfusion_master',
        password : '*masater777!',
        database : 'hfusion_master'
    });
    return _con;
}

//LOCAL HOST
let conLocal = () => {
    var _con;
    _con = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password : 'admin',
        database : 'hfusion'
    });
    return _con;
}


module.exports = conServer();