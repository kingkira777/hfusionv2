const con = require('../../modules/connection');
const moment = require('moment');

var Staff = {


    staff_remove : (staffid) => {
        return new Promise((resolve)=>{
            var r = `DELETE FROM staff_information WHERE staff_id = ?`;
            var rVal = [staffid];
            var r1 = `DELETE FROM staff_professional_information WHERE staff_id = ?`;
            var r1Val = [staffid];
            con.query(r,rVal,(err,rs)=>{
                if(err) throw err;
            });
            con.query(r1,r1Val,(err,rs)=>{
                if(err) throw err;
                resolve('deleted');
            });
        });
    },

    //STAFF DATA
    staff_data : (staffid) => {
        var data = {};
        return new Promise((resolve)=>{
            var g = `SELECT a.*, b.jobtitle, b.discipline, b.prof_license, b.npi,
            b.validtill, b.datefrom, b.dateto FROM staff_information a
            LEFT JOIN staff_professional_information b on a.staff_id = b.staff_id
            WHERE a.staff_id = ?`;
            var gVal = [staffid];
            con.query(g,gVal,(err,rs)=>{
                if(err) throw err;
                resolve(rs);
            });
        });
    },


    //STAFF TABLE LIST
    staff_table_list : () => {
        var staffData = [];
        return new Promise((resolve)=>{
            var gProf = `SELECT a.staff_id, a.firstname, a.lastname,
            a.dob, a.phone, a.cellphone, a.fax, a.address, 
            a.city, a.state, a.zipcode, b.discipline, b.datefrom, b.dateto FROM staff_information a
            LEFT JOIN  staff_professional_information b on a.staff_id = b.staff_id`;
            con.query(gProf,(err,rs)=>{
                if(err) throw err;
                for(var key in rs){
                    var data = {};
                    data['staffid'] = rs[key].staff_id;
                    data['name'] = rs[key].lastname+" "+rs[key].firstname;
                    data['dob'] = (rs[key].dob)? moment(rs[key].dob).format('MM/DD/YYYY') : '';
                    data['discipline'] = rs[key].discipline;
                    data['phone'] = rs[key].phone;
                    data['cellno'] = rs[key].cellphone;
                    data['address'] = rs[key].address+" "+rs[key].city+" "+rs[key].state+" "+rs[key].zipcode;
                    data['hiredate'] = (rs[key].datefrom)? moment(rs[key].datefrom).format('MM/DD/YYYY') : '';
                    data['termination'] = (rs[key].dateto)? moment(rs[key].dateto).format('MM/DD/YYYY') : '';
                    staffData.push(data);
                }
                resolve(staffData);
            });
        });
    },


    //SAVE UPDATE STAFF INFORMATION DATA
    save_update_staff_information : (data) => {
        return new Promise((resolve)=>{
            var c = `SELECT * FROM staff_information WHERE staff_id = ?`;
            var cVal = [data.staffid];
            con.query(c,cVal,(err,rs)=>{
                if(err) throw err;
                if(rs.length > 0){
                    var u = `UPDATE staff_information SET firstname = ?, lastname =?, dob = ?,
                    ssn = ?, driver_license = ?, cell_provider = ?, phone = ?, cellphone  = ?,
                    fax = ?, address = ?, city = ?, state = ?, zipcode = ? WHERE staff_id = ?`;
                    var uVal = [data.firstname, data.lastname,
                        data.dob, data.ssn, data.driverlic, data.cellprovider, data.phone, data.cellno, 
                        data.fax, data.address, data.city, data.state, data.zipcode,data.staffid];
                    
                    var uProf = `UPDATE staff_professional_information SET jobtitle = ?, 
                    discipline = ?, prof_license = ?, npi  = ?, validtill = ?, datefrom = ?,
                    dateto = ? WHERE staff_id = ?`;
                    var uProfVal = [data.jobtitle, data.discipline, data.proflicense,
                        data.npi, data.valid, data.dateFrom, data.dateTo,data.staffid];
                    con.query(uProf,uProfVal,(err,rs)=>{

                    });

                    con.query(u,uVal,(err,rs)=>{
                        if(err) throw err;
                        resolve('updated'); 
                    });

                }else{

                    var s = `INSERT INTO  staff_information(staff_id, firstname, lastname, 
                        dob, ssn, driver_license, cell_provider, phone, cellphone, fax,
                        address, city, state, zipcode) VALUES ?`;
                    var sVal = [
                        [data.staffid, data.firstname, data.lastname,
                        data.dob, data.ssn, data.driverlic, data.cellprovider, data.phone, data.cellno, 
                        data.fax, data.address, data.city, data.state, data.zipcode]
                    ];


                    var sProf = `INSERT INTO staff_professional_information(staff_id, jobtitle, discipline,
                        prof_license, npi, validtill, datefrom, dateto) VALUES ?`;
                    var sProfVal = [
                        [data.staffid, data.jobtitle, data.discipline, data.proflicense,
                        data.npi, data.valid, data.dateFrom, data.dateTo]
                    ];

                    con.query(sProf,[sProfVal],(err,rs)=>{
                        if(err) throw err;
                    });

                    con.query(s,[sVal],(err,rs)=>{
                        if(err) throw err;
                        resolve('saved');
                    });
                }
            });
        });
    }

    //SAVE UPDATE STAFF PROFESSIONAL INFORMATION

};




module.exports = Staff;