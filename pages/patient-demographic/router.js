const express = require('express');
const router = express.Router();
const master = require('../../modules/master');
const con = require('../../modules/connection');
const options = require('../../modules/opions');
const patient = require('./patient');


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
            ethnicity: options.ethnicityList()
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




module.exports = router;
