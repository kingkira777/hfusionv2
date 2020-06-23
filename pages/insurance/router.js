const express = require('express');
const router = express.Router();
const master = require('../../modules/master');
const insurance = require('./insurance');

let source_type = {
    A1400A : 'Medicare (traditional fee-for-service)',
    A1400B : 'Medicare (managed care/Part C/Medicare Advantage)',
    A1400C : 'Medicaid (traditional fee-for-service)',
    A1400D : 'Medicaid (managed care)',
    A1400G : 'Other government (e.g., TRICARE, VA, etc.)',
    A1400H : 'Private Insurance/Medigap',
    A1400I : 'Private managed care',
    A1400J : 'Self-pay',
    A1400K : 'No payor source',
    A1400X : 'Unknown',
    A1400Y : 'Other'
};

router.get('/',(req,res,next)=>{

    res.render('insurance/insurance',{
        title : 'Insurance',
        staffActive : 'active'
    });
    res.end();

});

//DELETE INSURANCE====================================================
router.get('/delete-insurance?',(req,res)=>{
    var insurance_id = req.query.id;
    insurance.insurance_delete(insurance_id).then(e =>{
        res.json({
            message : 'deleted'
        });
    });
});


//ADD /EDIT INSURANCE=================================================
router.get('/add-update-insurance?',(req,res,next)=>{
    var insurance_id = (req.query.id)? req.query.id : master.UniqueID();
    insurance.insurance_data(insurance_id).then((result)=>{
        res.render('insurance/add-update',{
            title : 'Add/Update Insurance',
            staffActive : 'active',
            insuranceno : insurance_id,
            source_type : source_type,
            data : result
        });
        res.end();
    });
});


//GET INSURANCE TABLE LIST
router.get('/insurance-table-list',(req,res)=>{
    insurance.insurance_table_list().then((e)=>{
        res.json(e);
        res.end();
    });
});


// SAVE UPDATE INSURANCE ==========================================
router.post('/save-update/(:id)',(req,res)=>{

    let data = {
        insurance_id : req.params.id,
        name : req.body.name,
        email : req.body.email,
        source : req.body.source,
        address : req.body.address,
        city : req.body.city,
        state : req.body.state,
        zipcode : req.body.zipcode,
        phoneno : req.body.phoneno,
        phoneno1 : req.body.phoneno1,
        fax : req.body.fax
    };
    insurance.save_update(data).then((e)=>{
        res.json({
            message : e
        });
    });


});



module.exports = router;