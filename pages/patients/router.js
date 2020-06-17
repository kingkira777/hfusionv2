const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>{
    res.render('patients/patients',{
        title : 'Patients',
        patientActive : 'active',
        openPatient :false
    });
});






module.exports = router;