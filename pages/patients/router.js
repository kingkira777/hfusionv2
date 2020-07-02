const express = require('express');
const router = express.Router();
const options = require('../../modules/opions');
const Master = require('../../modules/master');
const patient = require('../patient-demographic/patient');

router.get('/', (req, res, next) => {
    res.render('patients/patients', {
        title: 'Patients',
        patientActive: 'active',
        openPatient: false
    });
    res.end();
});

//PATIENT TABLE LIST;/
router.get('/patient-table-list',(req,res)=>{
    async function PatientList(){
        var patientList = await patient.patient_tableList();
        res.json(patientList);
        res.end();
    }
    PatientList();
});


//Add NEW PATIENT
router.get('/add-patient', (req, res, next) => {
    res.render('patients/add-patient', {
        title: 'Add New Patients',
        patientActive: 'active',
        openPatient: false,
        race: options.raceList(),
        ethnicity: options.ethnicityList()
    });
    res.end();
});


// SAVE NEW PATIENT
router.post('/save-patient', (req, res) => {
    var patientid = Master.UniqueID();
    var data = {
        patientid: patientid,
        mrno: req.body.mrno,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        dob: (req.body.dob) ? Master.dateFormat(req.body.dob, 'YYYY-MM-DD') : '',
        gender: req.body.gender,
        mstatus: req.body.mstatus,
        ssn: req.body.ssn,
        phoneno: req.body.phoneno,
        cellno: req.body.cellno,
        primlang: req.body.primlang,
        race: req.body.race,
        ethnicity: req.body.ethnicity,
        religion: req.body.religion,
        denomination: req.body.denomination,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode
    };
    patient.save_new_patient_info(data).then((e) => {
        res.json({
            message: e
        });
        res.end();
    });
});





module.exports = router;