const mysql = require('mysql');

//Server Host
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

//Local Host
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