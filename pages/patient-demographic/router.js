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







module.exports = router;
