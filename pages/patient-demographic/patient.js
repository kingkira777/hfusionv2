const con = require('../../modules/connection');
const master = require('../../modules/master');
const Master = require('../../modules/master');

var Patient = {



    //PATIENT DATA
    patient_data : (patientid) => {
        return new Promise(resolve => {
            var g = `SELECT * FROM patients WHERE patient_id = ?`;
            var gVal = [patientid];
            con.query(g,gVal,(err,rs)=>{
                if(err) throw err;
                resolve(rs);
            });
        });
    },

    //PATIENT TABLE LIST
    patient_tableList : async () => {
        var patientinfo = [];
        var patients = await Patient.patient_dataList();
        for(var key in patients){
            var data = {
                id : patients[key].patient_id,
                mrno : patients[key].mrno,
                name : patients[key].lastname+" "+patients[key].firstname+" "+patients[key].middlename,
                dob : (patients[key].dob)? Master.dateFormat(patients[key].dob,'MM/DD/YYYY') : ''
            };
            patientinfo.push(data);
        }
        return new Promise((resolve)=>{
            resolve(patientinfo);
        });
    },

    patient_dataList : () => {
        var g = `SELECT * FROM patients`;
        return new Promise((resolve)=>{
            con.query(g,(err,rs)=>{
                resolve(rs);
            });
        });
    },


    //UPDATE PATIENT INFORMATION
    update_patient_info : (data) => {
        var u = `UPDATE patients SET mrno = ?, lastname = ?, firstname = ?, middlename = ?,
            dob = ?, gender = ?, marital_status = ?, ssn = ?, phoneno = ?, cellno = ?, primary_lang = ?,
            race = ?, ethnicity = ?, religion = ?, denomination = ?, 
            address = ?, city = ?, state = ?, zipcode = ? WHERE patient_id = ?`;
        var uVal = [data.mrno, data.lastname, data.firstname,
            data.middlename, data.dob, data.gender, data.mstatus, data.ssn, data.phoneno, 
            data.cellno, data.primlang, data.race, data.ethnicity, data.religion,
            data.denomination, data.address, data.city, data.state, data.zipcode,data.patientid];
        return new Promise(resolve => {
            con.query(u,uVal,(err,rs)=>{
                if(err) throw err;
                resolve('updated'); 
            });
        });
    },

    //SAVE NEW PATIENT INFORMATION
    save_new_patient_info : (data) => {
        var c = "SELECT * FROM  patients WHERE mrno = ?";
        var cVal = [data.mrno];
        return new Promise(resolve=>{
            con.query(c,cVal,(err,rs)=>{
                if(err) throw err;
                if(rs.length > 0){
                    resolve('existed');
                }else{
                    var s = `INSERT INTO  patients(patient_id, mrno, lastname, firstname,
                        middlename, dob, gender, marital_status, ssn,  phoneno, cellno, primary_lang,
                        race, ethnicity, religion, denomination, address, city, state, zipcode)
                        VALUES ?`;
                    var sVal = [
                        [data.patientid, data.mrno, data.lastname, data.firstname,
                        data.middlename, data.dob, data.gender, data.mstatus, data.ssn, data.phoneno, 
                        data.cellno, data.primlang, data.race, data.ethnicity, data.religion,
                        data.denomination, data.address, data.city, data.state, data.zipcode]
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


module.exports = Patient;