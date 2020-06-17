const mysql = require('mysql');

//Server Host
let conServer = () => {
    var _con;
    _con = mysql.createPool({
        host: 'localhost',
        user: '',
        password : '',
        database : ''
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
        database : 'master'
    });
    return _con;
}


module.exports = conLocal;