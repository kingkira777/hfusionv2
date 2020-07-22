const con = require('../../modules/connection');
const master = require('../../modules/master');

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
                    admit_type : rs[0].admit_type,
                    start_cert : rs[0].start_cert,
                    transfer_from : rs[0].transfer_from,
                    cert_valid_to : rs[0].cert_valid_to,
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
                    recert = ?, eoc = ?, admit_type = ?, start_cert = ?, transfer_from = ?,
                    cert_valid_to = ?, discharge_code = ?, primary_dx = ?, primary_disease = ?,
                    secondary_dx = ?, secondary_disease = ? WHERE patient_id = ?`;
                    var uVal = [data.refdate, data.soc, data.recert, data.eoc, data.admit_type,
                    data.start_cert, data.transfer_from, data.cert_valid_to, data.discharge_code,
                    data.primary_dx, data.primary_disease, data.secondary_dx, data.secondary_disease,
                    data.patientid];
                    con.query(u,uVal,(err,rs)=>{
                        if(err) throw err;
                        resolve('updated'); 
                    });
                }else{
                    var s = `INSERT INTO  patient_dateofservice_allergies(patient_id, refdate, soc,
                        recert, eoc, admit_type, start_cert,transfer_from,cert_valid_to, discharge_code, 
                        primary_dx, primary_disease, secondary_dx,secondary_disease) VALUES ?`;
                    var sVal = [
                        [data.patientid, data.refdate, data.soc, data.recert, data.eoc,
                        data.admit_type, data.start_cert, data.transfer_from, data.cert_valid_to, 
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




    //PATIENT PLACE OF SERVICE===============================================================
    //get data -----------------
    placeofservice_data : (patientid) => {
        var xdata = [];
        var g = `SELECT * FROM patient_placeofservice WHERE patient_id = ?`;
        var gVal = [patientid];
        return new Promise(resolve => {
            con.query(g,gVal,(err,rs)=>{
                if(err) throw err;
                for(var key in rs){
                    var data = {
                        patientid : rs[key].patient_id,
                        type : rs[key].type,
                        effective_date : (rs[key].effective_date)? master.dateFormat(rs[key].effective_date,'MM/DD/YYYY') : '',
                        facility_name : rs[key].facility_name,
                        unit_no : rs[key].unit_no,
                        pcg : rs[key].pcg,
                        npi	 : rs[key].npi,
                        rnb_rate : rs[key].rnb_rate,
                        phone : rs[key].phone,
                        alt_phone : rs[key].alt_phone,
                        fax : rs[key].fax,
                        address : rs[key].address,
                        city : rs[key].city,
                        state : rs[key].state,
                        zipcode : rs[key].zipcode,
                    }
                    xdata.push(data);
                };
                var _data = (xdata[0])? xdata[0] : [];
                resolve(_data);
            });
        });
    },
    //save update ---------------
    update_patient_pos : (data) => {
        var c = `SELECT * FROM patient_placeofservice WHERE patient_id = ?`;
        var cVal = [data.patientid];
        return new Promise(resolve => {
            con.query(c,cVal,(err,rs)=>{
                if(err) throw err;
                if(rs.length > 0){
                    var u = `UPDATE patient_placeofservice SET type = ?, effective_date = ?,
                    facility_name = ?, unit_no = ?, pcg = ?, npi = ?, rnb_rate = ?, 
                    phone = ?, alt_phone = ?, fax = ?, address = ?, city = ?, state = ?,
                    zipcode = ? WHERE patient_id = ?`;
                    var uVal = [data.type, data.effective_date, data.facility_name, 
                        data.unit_no, data.pcg, data.npi, data.rnb_rate, data.phone, data.alt_phone,
                        data.fax, data.address, data.city, data.state, data.zipcode,data.patientid];
                    con.query(u,uVal,(err,rs)=>{
                        if(err) throw err;
                        resolve('updated');
                    });
                }else{
                    var s = `INSERT INTO patient_placeofservice(patient_id, type, effective_date,
                        facility_name, unit_no, pcg, npi, rnb_rate, phone, alt_phone, fax, address,
                        city, state, zipcode) VALUES ?`;
                    var sVal = [
                        [data.patientid, data.type, data.effective_date, data.facility_name, 
                        data.unit_no, data.pcg, data.npi, data.rnb_rate, data.phone, data.alt_phone,
                        data.fax, data.address, data.city, data.state, data.zipcode]
                    ];
                    con.query(s,[sVal],(err,rs)=>{
                        if(err) throw err ;
                        resolve('saved');
                    });
                }
            });
        });
    },


    // PATIENT AUTHORIZED REP, EMERGENCY CONTACT

    //Get Data Patient AREC
    arec_data : (patientid) => {
        var g = `SELECT * FROM patient_arec WHERE patient_id = ?`;
        var gVal = [patientid];
        return new Promise(resolve=>{
            con.query(g,gVal,(err,rs)=>{
                if(err) throw err;
                var data = (rs[0])? rs[0] : [];
                resolve(data);
            });
        });
    },


    //Save Update AR EC
    update_arec : (data) => {
        var c = `SELECT * FROM patient_arec WHERE patient_id = ?`;
        var cVal = [data.patientid];
        return new Promise(resolve => {
            con.query(c,cVal,(err,rs)=>{
                if(err) throw err;
                if(rs.length > 0){
                    var u = `UPDATE patient_arec SET lastname = ?, firstname = ?, email = ?,
                    phone = ?, altphone = ?, fax =?, relationship= ?, arec_is = ?, 
                    patient_is = ?, address = ?, city = ?, state = ?, zipcode =? 
                    WHERE patient_id = ?`;
                    var uVal = [data.lastname, data.firstname, data.email, data.phone,
                        data.altphone, data.fax, data.relationship, data.arec_is, data.patient_is,
                        data.address, data.city, data.state, data.zipcode,data.patientid];
                    con.query(u,uVal,(err,rs)=>{
                        resolve('updated')
                    })
                }else{
                    var s = `INSERT INTO patient_arec(patient_id, lastname, firstname, email, 
                        phone, altphone, fax, relationship, arec_is, patient_is, address, city, 
                        state, zipcode) VALUES ?`;
                    var sVal = [
                        [data.patientid, data.lastname, data.firstname, data.email, data.phone,
                        data.altphone, data.fax, data.relationship, data.arec_is, data.patient_is,
                        data.address, data.city, data.state, data.zipcode]
                    ];
                    con.query(s,[sVal],(err,rs)=>{
                        if(err) throw err;
                        resolve('saved');
                    });
                }
            });
        }); 
    },




    // Referral Source & Attending MD =====================================================================
    //Get Data--------------
    rsamd_data : (patientid) => {
        return new Promise( resolve => {
            var g = `SELECT a.*, b.firstname, b.lastname, c.discipline FROM patient_rsmd a
                LEFT JOIN staff_information b on a.staff_id = b.staff_id
                LEFT JOIN staff_professional_information c on a.staff_id = c.staff_id
                WHERE  a.patient_id = ?`;
            var gVal = [patientid];
            con.query(g,gVal,(err,rs)=>{
                if(err) throw err;
                resolve(rs);
            });
        });
    },


    //Save Update Data------
    update_rsamd : (data) => {
        return new Promise(resolve => {
            var s = `INSERT INTO patient_rsmd(patient_id, type, staff_id) VALUES ?`
            var sVal = [
                [data.patientid, data.type, data.staffid]
            ];
            con.query(s,[sVal],(err,rs)=>{
                if(err) throw err;
                resolve('saved');
            });
        });
    },



    // Vendors =======================================================================================
    // Get Data -----------
    vendor_data : (patientid) => {
        var g = `SELECT * FROM patient_vendors WHERE patient_id = ?`;
        var gVal = [patientid];
        return new Promise(resolve=>{
            con.query(g,gVal,(err,rs)=>{
                if(err) throw err;
                var data = (rs.length > 0)? rs[0] : [];
                resolve(data); 
            });
        })
    },

    // Save Update Data
    update_vendor : (data) =>{
        var c = `SELECT * FROM patient_vendors WHERE patient_id = ?`;
        var cVal = [data.patientid];
        return new Promise(resolve=>{
            con.query(c,cVal,(err,rs)=>{
                if(err) throw err;
                if(rs.length > 0) {
                    var u = `UPDATE patient_vendors SET pharma_main = ?, pharma_alt = ?,
                    dme_main = ?, dme_alt = ?, others_main = ?, others_alt = ? 
                    WHERE patient_id = ?`;
                    var uVal = [data.pharma_main, data.pharma_alt,data.dme_main,data.dme_alt,
                    data.others_main, data.others_alt, data.patientid];
                    con.query(u,uVal,(err,rs)=>{
                        if(err) throw err;
                        resolve('updated');
                    });
                }else{
                    var  s = `INSERT INTO patient_vendors(patient_id, pharma_main, pharma_alt, dme_main,
                        dme_alt, others_main, others_alt) VALUES ?`;
                    var sVal = [
                        [data.patientid, data.pharma_main, data.pharma_alt,
                        data.dme_main, data.dme_alt, data.others_main, data.others_alt]
                    ];
                    con.query(s,[sVal],(err,rs)=>{
                        if(err) throw err;
                        resolve('saved');
                    })
                }
            });
        });
    },


    // Mortuary Information==============================================================================
    //Get Data-------------
    mortuary_data : (patientid) => {
        var g = `SELECT * FROM patient_mortuary WHERE patient_id = ?`;
        var gVal = [patientid];
        return new Promise(resolve =>{
            con.query(g,gVal,(err,rs)=>{
                if(err) throw err;
                var data = (rs.length> 0)? rs[0] : [];
                resolve(data)
            });
        });
    },

    update_mortuary : (data) => {
        var c = `SELECT * FROM patient_mortuary WHERE patient_id = ?`;
        var cVal = [data.patientid];
        return new Promise(resolve => {
            con.query(c,cVal,(err,rs)=>{
                if(err) throw err;
                if(rs.length > 0){
                    var u = `UPDATE patient_mortuary SET name = ?, contact_name = ?, email = ?,
                    phone = ?, alt_phone = ?, fax = ?, address = ?, city = ?, state = ?,
                    zipcode = ? WHERE patient_id = ?`;
                    var uVal = [data.name, data.contact_name, data.email, data.phone,
                    data.alt_phone, data.fax, data.address, data.city, data.state,
                    data.zipcode, data.patientid];
                    con.query(u,uVal,(err,rs)=>{
                        if(err) throw err;
                        resolve('updated');
                    });
                }else{
                    var s = `INSERT INTO patient_mortuary(patient_id, name, contact_name, email,
                        phone, alt_phone, fax, address, city, state, zipcode) VALUES ?`;
                    var sVal = [
                        [data.patientid, data.name, data.contact_name, data.email, data.phone,
                        data.alt_phone, data.fax, data.address, data.city, data.state, 
                        data.zipcode]
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