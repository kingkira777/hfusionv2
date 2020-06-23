const express = require('express');
const router = express.Router();
const options = require('../../modules/opions');

router.get('/',(req,res,next)=>{
    res.render('patients/patients',{
        title : 'Patients',
        patientActive : 'active',
        openPatient :false
    });
});

//Add new patient
router.get('/add-patient',(req,res,next)=>{
    res.render('patients/add-patient',{
        title : 'Add New Patients',
        patientActive : 'active',
        openPatient :false,
        race : options.raceList(), 
        ethnicity : options.ethnicityList()
    });
});







module.exports = router;