const con = require('../../modules/connection');

let Vendor = {
    


    //DELETE VENDOR
    vender_delete : (id) =>{
        return new Promise((resolve)=>{
            var d = `DELETE FROM vendors WHERE id = ?`;
            var dVal = [id];
            con.query(d,dVal,(err,rs)=>{
                if(err) throw err;
                resolve('deleted');
            });
        });
    },

    //VENDOR DATA
    vendor_data : (vendorid) => {
        return new Promise((resolve)=>{
            var g = `SELECT * FROM vendors WHERE vendor_id = ?`;
            var gVal = [vendorid];
            con.query(g,gVal,(err,rs)=>{
                if(err) throw err;
                resolve(rs);
            });
        });
    },

    //VENDOR TABLE LIST
    vendor_table_list : () => {
        var tableData = [];
        return new Promise((resolve)=>{
            var g = `SELECT * FROM vendors`;
            con.query(g,(err,rs)=>{
                if(err) throw err;
                for(var key in rs){
                    var data = {
                        id : rs[key].id,
                        vendorid : rs[key].vendor_id,
                        name : rs[key].name,
                        type : rs[key].type,
                        cellno : rs[key].cellno,
                        phone : rs[key].phone,
                        fax : rs[key].fax,
                        email : rs[key].email,
                        cperson : rs[key].cperson,
                        npi : rs[key].npi,
                        npi_exp : rs[key].npi_exp,
                        bus : rs[key].bus,
                        bus_exp : rs[key].bus_exp,
                        insurance : rs[key].insurance,
                        insurance_exp : rs[key].insurance_exp,
                        address : rs[key].address+" "+rs[key].city+" "+rs[key].state+" "+rs[key].zipcode,
                    };
                    tableData.push(data);
                }
                resolve(tableData);
            });
        });
    },

    //SAVE UPDATE VENDOR
    save_update : (data = Array) => {
        return new Promise((resolve)=>{
            var c = `SELECT * FROM vendors WHERE vendor_id = ?`
            var cVal = [data.vendorid];
            con.query(c,cVal,(err,rs)=>{
                if(err) throw err;
                if(rs.length > 0){
                    // UPDATE VENDOR
                    var u = `UPDATE vendors SET name = ?, type = ? , cellno = ?, phone = ?,
                        fax = ?, email = ?, cperson = ?, npi = ?, npi_exp = ?, bus = ?,
                        bus_exp = ?, insurance = ?, insurance_exp = ?, address = ?, city = ?,
                        state = ?, zipcode = ? WHERE vendor_id = ?`;
                    var uVal = [data.name, data.type, data.cellno, data.phone,
                        data.fax, data.email, data.cperson, data.npi, data.npi_exp, data.bus,
                        data.bus_exp, data.insurance, data.insurance_exp, data.address,
                        data.city, data.state, data.zipcode,data.vendorid];
                    con.query(u,uVal,(err,rs)=>{
                        if(err) throw err;
                        resolve('updated');
                    });
                }else{
                    // SAVE NEW VENDOR
                    var s = `INSERT INTO vendors(vendor_id, name, type, cellno, phone,
                        fax, email, cperson, npi, npi_exp, bus, bus_exp, insurance, insurance_exp,
                        address, city, state, zipcode) VALUES ?`;
                    var sVal = [
                        [data.vendorid, data.name, data.type, data.cellno, data.phone,
                        data.fax, data.email, data.cperson, data.npi, data.npi_exp, data.bus,
                        data.bus_exp, data.insurance, data.insurance_exp, 
                        data.address, data.city, data.state, data.zipcode]
                    ];
                    con.query(s,[sVal],(err,rs)=>{
                        if(err) throw err;
                        resolve('saved');
                    });
                }
            }); 
        });
    }
};


module.exports = Vendor;