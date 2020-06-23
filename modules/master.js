const crypto = require('crypto');
const moment = require('moment');

var Master = {




    //Change Date Format using Momentjs
    dateFormat : (date,format) =>{
        var newdate = moment(date).format(format);
        return newdate;
    },

    //Generate Uniqued ID 
    UniqueID : ()=>{
        var uid = crypto.randomBytes(Math.ceil(8)).toString('hex').slice(0,8);
        return uid;
    },
};

module.exports = Master;