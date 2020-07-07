const express = require('express');
const router = express.Router();
const master = require('../../modules/master');
const vendor = require('./vendors');


let types = {
    al : 'AL',
    bnc : 'B&C',
    pharmacy : 'Pharmacy',
    dme : 'DME',
    laboratory : 'Laboratory',
    mortuary : 'Mortuary',
    cs : 'Contracted Staff',
    transportation : 'Transportation',
    supplies : 'Supplies',
};


router.get('/',(req,res,next)=>{
    if(!req.session.userid){
        res.redirect('/login');
        res.end();
    }
    

    res.render('vendors/vendors',{
        title : 'Vendors',
        staffActive : 'active'
    });
    res.end();

});


// Add / Update Vendor (Render)
router.get('/add-update?',(req,res,next)=>{
    if(!req.session.userid){
        res.redirect('/login');
        res.end();
    }
    

    var vendor_id = (req.query.id)? req.query.id : master.UniqueID();
    vendor.vendor_data(vendor_id).then(e=>{
        res.render('vendors/add-update',{
            title : 'Add/Update Vendor', 
            staffActive : 'active',
            types : types,
            vendor_id : vendor_id,
            data : e 
        });
        res.end();
    });
    
});


// REMOVE VENDOR
router.get('/remove-vendor?',(req,res)=>{
    if(!req.session.userid){
        res.redirect('/login');
        res.end();
    }
    

    var id = req.query.id;
    vendor.vender_delete(id).then(e => {
        res.json({
            message : e
        });
        res.end();
    });
});


// GET VENDOR TABLE LIST
router.get('/vendor-table-list',(req,res)=>{
    if(!req.session.userid){
        res.redirect('/login');
        res.end();
    }
    

    vendor.vendor_table_list().then(e=>{
        res.json(e);
        res.end();
    });
});


//SAVE UPDATE VENDOR
router.post('/save-update/(:id)',(req,res)=>{
    if(!req.session.userid){
        res.redirect('/login');
        res.end();
    }
    
    
    var data = {
        vendorid : req.params.id,
        name : req.body.name,
        type : req.body.type,
        cellno : req.body.cellno,
        phone : req.body.phone,
        fax : req.body.fax,
        email : req.body.email,
        cperson : req.body.cperson,
        npi : req.body.npi,
        npi_exp : master.dateFormat(req.body.npi_exp,'YYYY-MM-DD'),
        bus : req.body.bus,
        bus_exp :  master.dateFormat(req.body.bus_exp,'YYYY-MM-DD'),
        insurance : req.body.insurace,
        insurance_exp : master.dateFormat(req.body.insurace_exp,'YYYY-MM-DD'),
        address : req.body.address,
        city : req.body.city,
        state : req.body.state,
        zipcode : req.body.zipcode
    };
    vendor.save_update(data).then(e=>{
        res.json({
            message : e 
        });
        res.end();
    });
});

module.exports = router;