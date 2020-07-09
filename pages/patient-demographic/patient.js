const con = require('../../modules/connection');
const master = require('../../modules/master');
const { on } = require('../../modules/connection');

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
                dob : (patients[key].dob)? master.dateFormat(patients[key].dob,'MM/DD/YYYY') : ''
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
    },






    //PATIENT INSURACNE====================================================

    //Patient Insurance Data 
    insurance_data : (patientid) => {
        var g = `SELECT * FROM patient_insurance WHERE patient_id = ?`;
        var gVal = [patientid];
        return new Promise(resolve => {
            con.query(g,gVal,(err,rs)=>{
                if(err) throw err;
                var data = (rs[0])? rs[0] : {};        
                resolve(data);
            });
        })
    },


    //Save Update Patient Insurance
    insurace_update : (data) => {
        var c = `SELECT * FROM patient_insurance WHERE patient_id = ?`;
        var cVal = [data.patientid];
        return new Promise(resolve => {
            con.query(c,cVal,(err,rs)=>{
                if(err) throw err;
                if(rs.length > 0){
                    var u = `UPDATE patient_insurance SET source = ?, effective_date = ?,
                    payer = ?, sharecost = ?, policyno = ?, mbino = ?, groupno = ?,
                    binno = ? WHERE patient_id = ?`;
                    var uVal = [data.source, data.effectivedate, data.payer, data.sharecost,
                    data.policyno, data.mbino, data.groupno, data.binno, data.patientid];
                    con.query(u,uVal,(err,rs)=>{
                        if(err) throw err;
                        resolve('updated');
                    });
                }else{
                    var s = `INSERT INTO patient_insurance(patient_id, source, effective_date,
                        payer, sharecost, policyno, mbino, groupno, binno) VALUES ?`;
                    var sVal = [
                        [data.patientid, data.source, data.effectivedate, data.payer, data.sharecost,
                        data.policyno, data.mbino, data.groupno, data.binno]
                    ];
                    con.query(s,[sVal],(err,rs)=>{
                        if(err) throw err;
                        resolve('saved');
                    });
                }
            });
        });
    },  


    // PATIENT DATE OF SERVICE & ALLERGIES =========================================================
    //get date---------------------
    dateofserivce_data : (patientid) => {
        var g = `SELECT * FROM  patient_dateofservice_allergies WHERE patient_id = ?`;
        var gVal = [patientid];
        return new Promise(resolve => {
            con.query(g,gVal,(err,rs)=>{
                if(err) throw err;
                var data = {
                    refdate : (rs[0].refdate)? master.dateFormat(rs[0].refdate,'MM/DD/YYYY') : '',
                    soc : (rs[0].soc)? master.dateFormat(rs[0].soc,'MM/DD/YYYY') : '',
                    recert : (rs[0].recert)? master.dateFormat(rs[0].recert,'MM/DD/YYYY') : '',
                    eoc : (rs[0].eoc)? master.dateFormat(rs[0].eoc,'MM/DD/YYYY') : '',
                    discharge_code : rs[0].discharge_code,
                    primary_dx : rs[0].primary_dx,
                    primary_disease : rs[0].primary_disease,
                    secondary_dx : rs[0].secondary_dx,
                    secondary_disease : rs[0].secondary_disease
                };
                resolve(data);
            });
        });
    },

    //update data------------------
    dateofserivce_allergies_update : (data) => {
        var c = `SELECT * FROM patient_dateofservice_allergies WHERE patient_id = ?`;
        var cVal = [data.patientid];
        return new Promise(resolve => {
            con.query(c,cVal,(err,rs)=>{
                if(err) throw err;
                if(rs.length > 0){
                    var u = `UPDATE patient_dateofservice_allergies SET refdate = ?, soc = ?, 
                    recert = ?, recert = ?, discharge_code = ?, primary_dx = ?, primary_disease = ?,
                    secondary_dx = ?, secondary_disease = ? WHERE patient_id = ?`;
                    var uVal = [data.refdate, data.soc, data.soc, data.eoc,
                    data.discharge_code, data.primary_dx, data.primary_disease, data.secondary_dx,
                    data.secondary_disease,data.patientid];
                    con.query(u,uVal,(err,rs)=>{
                        if(err) throw err;
                        resolve('updated'); 
                    });
                }else{
                    var s = `INSERT INTO  patient_dateofservice_allergies(patient_id, refdate, soc,
                        recert, eoc, discharge_code, primary_dx, primary_disease, secondary_dx, 
                        secondary_disease) VALUES ?`;
                    var sVal = [
                        [data.patientid, data.refdate, data.soc, data.recert, data.eoc, 
                        data.discharge_code, data.primary_dx, data.primary_disease, 
                        data.secondary_dx, data.secondary_disease]
                    ];
                    con.query(s,[sVal],(err,rs)=>{
                        if(err) throw err;
                        resolve('saved');
                    });
                }
            });
        });
    },







};


module.exports = Patient;