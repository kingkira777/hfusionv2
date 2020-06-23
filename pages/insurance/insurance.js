var con = require('../../modules/connection');

let Insurance = {

    //DELETE INSURANCE =============================================================
    insurance_delete : (insurance_id) => {
        return new Promise((resolve)=>{
            var d = `DELETE  FROM insurance WHERE id = ?`;
            var dVal = [insurance_id];
            con.query(d,dVal,(err,rs)=>{
                if(err) throw err;
                resolve('deleted'); 
            });
        });
    },

    //EDIT INSURANCE ==================================================================
    insurance_data : (insurance_id)=>{
        return new Promise((resolve)=>{
            var g = `SELECT * FROM insurance WHERE insurance_id = ?`;
            var gVal = [insurance_id];
            con.query(g,gVal,(err,rs)=>{
                if(err) throw err;
                resolve(rs);
            });
        });
    },

    //GET INSURANCE TABLE LIST ==============================================================
    insurance_table_list : () => {
        var tableData = [];
        return new Promise((resolve)=>{
            var g = `SELECT * FROM insurance`;
            con.query(g,(err,rs)=>{
                if(err) throw err;
                for(var key in rs){
                    var data = {
                        id : rs[key].id,
                        insuranceid : rs[key].insurance_id,
                        name : rs[key].name,
                        source : rs[key].source_type,
                        address : rs[key].address+" "+rs[key].city+" "+rs[key].state+" "+rs[key].zipcode,
                        phone : rs[key].telehphone,
                        altphone : rs[key].alt_telephone,
                        fax : rs[key].fax,
                        email :rs[key].email
                    }
                    tableData.push(data);
                }
                resolve(tableData);
            });
        });
    },


    //SAVE UPDATE INSURACNE PROFILE =========================================================
    save_update : (data = Array) =>{
        var c = `SELECT * FROM insurance WHERE insurance_id = ?`;
        var cVal = [data.insurance_id];
        return new Promise((resolve)=>{
            con.query(c,cVal,(err,rs)=>{
                if(err) throw err;
                if(rs.length > 0){
                    //UPDATE INSURANCE PROFILE
                    var u = `UPDATE insurance SET name = ?, email = ?, source_type = ?,
                        address = ?, city = ?, state = ?, zipcode = ?, telehphone = ?, 
                        alt_telephone = ?, fax = ? WHERE insurance_id = ?`;
                    var uVal = [data.name, data.email,
                        data.source, data.address, data.city, data.state, data.zipcode,
                        data.phoneno, data.phoneno1,data.fax,data.insurance_id];
                    con.query(u,uVal,(err,rs)=>{
                        if(err) throw err;
                        resolve('updated');
                    });
                }else{

                    // SAVE NEW INSURANCE PROFILE
                    var s = `INSERT INTO insurance(insurance_id, name, email,
                        source_type, address, city, state, zipcode,
                        telehphone, alt_telephone, fax) VALUES ?`;
                    var sVal = [
                        [data.insurance_id, data.name, data.email,
                        data.source, data.address, data.city, data.state, data.zipcode,
                        data.phoneno, data.phoneno1,data.fax]
                    ]
                    con.query(s,[sVal],(err,rs)=>{
                        if(err) throw err;
                        resolve('saved');
                    });
                }
            });    
        });
        
    }
};


module.exports = Insurance;