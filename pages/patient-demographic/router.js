const express = require('express');
const router = express.Router();


router.get('/(:no)',(req,res,next)=>{
    res.render('patient-demographic/info',{
        title : 'Patient Demographic',
        openPatient : true 
    });
    res.end();
});





module.exports = router;
