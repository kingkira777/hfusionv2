const express = require('express');
const router = express.Router();
const master = require('../../modules/master');
const con = require('../../modules/connection');
const options = require('../../modules/opions');
const patient = require('./patient');


var insuranceList = [];

router.use((req,res,next)=>{
    async function initFn(){
        var instList = await options.insuranceList();
        insuranceList = instList;
        next();
    };
    initFn();
});


// VIEW PATIENT DEMOGRAPHIC================================================
router.get('/(:id)',(req,res,next)=>{
    if(!req.session.userid){
        res.redirect('/login');
        res.end();
    }
    

    var patientid = (req.params.id)? req.params.id : ''; 
    patient.patient_data(patientid).then((e)=>{
        res.render('patient-demographic/info',{
            title : 'Patient Demographic',
            patientid : patientid,
            data : e,
            openPatient : true,
            race: options.raceList(),
            ethnicity: options.ethnicityList(),
            insuranceList : insuranceList,
            diseaseList : options.diseaseList(),
        });
        res.end();
    });
});


// UPDATE PATIENT INFO======================================================
router.post('/(:id)/update-patient-info',(req,res)=>{     
    if(!req.session.userid){
        res.redirect('/login');
        res.end();
    }

    var patientid = (req.params.id)? req.params.id : '';
    var data = {
        patientid : patientid,
        mrno : req.body.mrno,
        lastname : req.body.lastname,
        firstname : req.body.firstname,
        middlename : req.body.middlename,
        dob : req.body.dob,
        ssn : req.body.ssn,
        gender : req.body.gender,
        mstatus : req.body.mstatus,
        phoneno : req.body.phoneno,
        cellno : req.body.cellno,
        primlang : req.body.primlang,
        race : req.body.race,
        ethnicity : req.body.ethnicity,
        religion : req.body.religion,
        denomination : req.body.denomination,
        address : req.body.address,
        city : req.body.city,
        state : req.body.state,
        zipcode : req.body.zipcode
    };
    patient.update_patient_info(data).then(e=>{
        res.json({
            message : e,
        });
        res.end();
    });
});



//PATIENT INSURACNE===========================================================================
router.get('/(:id)/insurance',(req,res)=>{
    if(req.params.id){
        patient.insurance_data(req.params.id).then(e=>{
            res.json(e);
            res.end();
        });
    }else{
        res.json([]);
        res.end();
    }
});

//Update Insurance------------
router.post('/(:id)/insurance',(req,res)=>{
    if(req.params.id){
        var data = {
            patientid : req.params.id,
            source : req.body.source,
            effectivedate :(req.body.effectivedate)? master.dateFormat(req.body.effectivedate,'YYYY-MM-DD') : '',
            payer : req.body.payer,
            sharecost : req.body.cost,
            policyno : req.body.policy,
            mbino : req.body.mbino,
            groupno :req.body.groupno,
            binno : req.body.binno
        }
        patient.insurace_update(data).then(e=>{
            res.json({
                message : e
            });
            res.end();
        });
    }else{
        res.json({
            message : 'failed'
        });
        res.end();
    }
});





// DATE OF SERVICE, DIAGNOSIS AND ALLERGIES==================================================
//Get DATA---------------------------
router.get('/(:id)/dsda',(req,res)=>{
    var patientid = req.params.id;
    if(patientid){
        patient.dateofserivce_data(patientid).then(e=>{
            res.json(e);
            res.end();
        });
    }else{
        res.json([]);
        res.end();
    }

});


//Save Update Data-------------------
router.post('/(:id)/dsda',(req,res)=>{
    if(req.params.id){
        var data = {
            patientid : req.params.id,
            refdate : (req.body.refdate)? master.dateFormat(req.body.refdate,'YYYY-MM-DD') : '',
            soc : (req.body.soc)? master.dateFormat(req.body.soc, 'YYYY-MM-DD') : '',
            recert : (req.body.recert)? master.dateFormat(req.body.recert, 'YYYY-MM-DD') : '',
            eoc : (req.body.eoc)? master.dateFormat(req.body.eoc, 'YYYY-MM-DD') : '',
            discharge_code : req.body.discharge_code,
            admit_type : req.body.admit_type,
            start_cert : req.body.start_cert,
            transfer_from : req.body.transfer_from,
            cert_valid_to : req.body.cert_valid_to,
            primary_dx : req.body.primary_dx,
            primary_disease : req.body.primary_disease,
            secondary_dx : req.body.secondary_dx,
            secondary_disease : req.body.secondary_disease
        };
        patient.dateofserivce_allergies_update(data).then(e=>{
            res.json({
                message : e
            });
            res.end();
        });
    }else{
        res.json([]);
        res.end();
    }
});



// PLACE OF SERVICE===========================================================================
//Get Data------
router.get('/(:id)/placeofservice',(req,res)=>{
    var patientid = req.params.id;
    if(patientid){
        patient.placeofservice_data(patientid).then(e=>{
            res.json(e);
            res.end();
        });
    }else{  
        res.json([]);
        res.end();
    }
});

//Save Update Data----
router.post('/(:id)/placeofservice',(req,res)=>{
    var patientid = req.params.id;
    if(patientid){
        var data = {
            patientid : patientid,
            type : req.body.type,
            effective_date : (req.body.effective_date)? master.dateFormat(req.body.effective_date,'YYYY-MM-DD') : '',
            facility_name : req.body.facility_name,
            unit_no : req.body.unit_no,
            pcg : req.body.pcg,
            npi : req.body.npi,
            rnb_rate : req.body.rnb_rate,
            phone : req.body.phone,
            alt_phone : req.body.alt_phone,
            fax : req.body.fax,
            address : req.body.address,
            city : req.body.city,
            state : req.body.state,
            zipcode	: req.body.zipcode	
        }
        patient.update_patient_pos(data).then(e=>{
            res.json({
                message : e
            });
            res.end();
        });
    }else{
        res.json({
            message : 'failed'
        });
        res.end();
    }
});


// AUTHORIZED OF REP (AR), EMERGENCY CONTACT(EC) =============================================
router.get('/(:id)/arec',(req,res)=>{   
    var patientid = req.params.id;
    if(patientid){  
        patient.arec_data(patientid).then(e=>{
            res.json(e);
            res.end();
        });
    }else{
        res.json([]);
        res.end();
    }
});


//Save Update ------------------------
router.post('/(:id)/arec',(req,res)=>{
    var patientid = req.params.id;
    if(patientid){
        var data = {
            patientid : patientid,
            lastname : req.body.lastname,
            firstname : req.body.firstname,
            email : req.body.email,
            phone : req.body.phone,
            altphone : req.body.altphone,
            fax : req.body.fax,
            relationship : req.body.relationship,
            arec_is : req.body.arec_is,
            patient_is : req.body.patient_is,
            address : req.body.address,
            city : req.body.city,
            state : req.body.state,
            zipcode : req.body.zipcode
        };
        patient.update_arec(data).then(e=>{
            res.json({
                message : e
            });
            res.end();
        });
    }else{
        res.json({
            message : "failed"
        });
        res.end();
    }
});


//REFERAAL SOURCE & ATTENDING MD ===================================================
//Staff List 
router.get('/(:id)/stafflist?',(req,res)=>{
    var _discipline = (req.query.discipline)? req.query.discipline : '';
    options.saffList(_discipline).then(e=>{
        res.json(e);
        res.end();
    });
});

//Get Data------------
router.get('/(:id)/rsamd',(req,res)=>{

});

//Save Update ------------------
router.post('/(:id)/rsamd',(req,res)=>{
    var patientid = (req.params.id)? req.params.id : '';
    var data = {
        patientid : patientid,
        staffid : req.body.staff,
        type : req.body.type
    }
    patient.update_rsamd(data).then(e=>{
        res.json({
            message : e
        });
        res.end();
    });
});



// Vendors============================================================================
//Get Data-----------------------
router.get('/(:id)/vendor',(req,res)=>{
    var patientid = (req.params.id)? req.params.id : '';
    patient.vendor_data(patientid).then(e=>{
        res.json(e);
        res.end();
    });
});

// Save Update ------------------
router.post('/(:id)/vendor',(req,res)=>{
    var patientid = (req.params.id)? req.params.id : '';
    var data = {
        patientid : patientid,
        pharma_main : req.body.pharma_main,
        pharma_alt : req.body.pharma_alt,
        dme_main : req.body.dme_main,
        dme_alt : req.body.dme_alt,
        others_main : req.body.others_main,
        others_alt : req.body.others_alt
    }
    patient.update_vendor(data).then(e=>{
        res.json({
            message : e
        });
        res.end();
    });
});



// Motuary Information =================================================================
router.get('/(:id)/mortuary',(req,res)=>{
    var patientid = (req.params.id)? req.params.id : '';
    patient.mortuary_data(patientid).then(e=>{
        res.json(e);
        res.end();
    });
});

router.post('/(:id)/mortuary',(req,res)=>{
    var patientid = (req.params.id)? req.params.id : '';
    var data = {
        patientid : patientid,
        name : req.body.name,
        contact_name : req.body.contact_name,
        email : req.body.email,
        phone : req.body.phone,
        alt_phone : req.body.alt_phone,
        fax : req.body.fax,
        address : req.body.address,
        city : req.body.city,
        state : req.body.state,
        zipcode : req.body.zipcode 
    };
    patient.update_mortuary(data).then(e=>{
        res.json({
            message : e
        });
        res.end();
    });
});







module.exports = router;
