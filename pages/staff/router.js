const express = require('express');
const Master = require('../../modules/master');
const router = express.Router();
const staff = require('./staff');
const options = require('../../modules/opions');


router.get('/',(req,res,next)=>{
    res.render('staff/staff',{
        title : 'Staff',
        staffActive : 'active'
    });
});


router.get('/add-update?',(req,res)=>{
    var  staff_id = (req.query.id)? req.query.id : Master.UniqueID(); 
    staff.staff_data(staff_id).then((e)=>{
        res.render('staff/add-update',{
            title : 'Add/Update Staff',
            staffActive : 'active',
            discipline : options.disciplineList(),
            staffid : staff_id,
            data : e
        });
        res.end();
    });
});

router.get('/remove-staff?',(req,res)=>{
    var staffid  = req.query.id;
    staff.staff_remove(staffid).then((e)=>{
        res.json({
            message : e
        });
        res.end();
    });
});

router.get('/staff-table-list',(req,res)=>{
    staff.staff_table_list().then((e)=>{
        res.json(e);
        res.end();
    });
});


router.post('/save-update/(:id)',(req,res)=>{
    var data = {
        staffid : req.params.id,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        dob : (req.body.dob)? Master.dateFormat(req.body.dob,'YYYY-MM-DD') : '',
        ssn : req.body.ssn,
        driverlic : req.body.driverlic,
        cellprovider : req.body.cellprovider,
        phone : req.body.phone,
        cellno : req.body.cellno,
        fax : req.body.fax,
        address : req.body.address,
        city : req.body.city,
        state : req.body.state,
        zipcode : req.body.zipcode,

        jobtitle : req.body.jobtitle,
        discipline : req.body.discipline,
        proflicense : req.body.proflicense,
        dateFrom  : (req.body.dateFrom)? Master.dateFormat(req.body.dateFrom,'YYYY-MM-DD') : '',
        dateTo  : (req.body.dateTo)? Master.dateFormat(req.body.dateTo,'YYYY-MM-DD') : '',
        npi : req.body.npi,
        valid  : (req.body.valid)? Master.dateFormat(req.body.valid,'YYYY-MM-DD') : ''
    };

    staff.save_update_staff_information(data).then((e)=>{
        res.json({
            message : e
        });
        res.end();
    });
});






module.exports = router;