'use strict';

var Patient = function(){

    let initDOM = () => {
        console.log('PATIENT JS');
        patient_table_list();
        save_update_patient();
    };



    //Patient Table==================================
    let patient_table_list = () =>{
        axios.get('/patients/patient-table-list').then(e=>{
            // console.log(e.data);
            table_patient(e.data);
        });
    };


    //Save Update Patient Info==================================
    let save_update_patient = () => {
        // UPDATE PATIENT INFO
        $('#update-patient-form').submit((e)=>{
            var url = $(e.target).attr('action');
            var formdata = App.serializeFormData($(e.target).serializeArray());
            axios.post(url,formdata).then(e =>{
                console.log(e.data);
                if(e.data.message === "updated"){
                    App.messageModal('Successfuly Updated', '','success','');
                }
            });
            return e.preventDefault();
        });


        //SAVE NEW PATIENT
        $('#patient-form').submit((e)=>{
            var url = $(e.target).attr('action');
            var formdata = App.serializeFormData($(e.target).serializeArray());
            axios.post(url,formdata).then((e)=>{
                if(e.data.message === "existed"){
                    App.messageModal('MR# is already exist', 'MR# is already exist', 'warning');
                }
                if(e.data.message === "saved"){
                    App.messageModal('Saved','New Patient Successfuly Saved','success',(x)=>{
                        if(x){
                            location.reload();
                        }
                    });
                }
            });
            return e.preventDefault();
        });
    };


    //Table Patient
    let table_patient = (data) => {
        $('#patient-tableList').DataTable({
            data : data,
            columnDefs : [
                {
                    targets : [0],
                    data : data,
                    render : (e)=>{
                        return `<a href="/patient/`+e.id+`">`+e.mrno+`</a>`;
                    }
                }
            ],  
            columns :[
                { data : null, sTitle: 'MR#'},
                { data : 'name', sTitle : 'Patient'},
                { data : 'dob', sTitle : 'DOB'},
            ],
            bDestroy : true
        });
    };






    //PATIENT INSURANCE=================================================================
    let patient_insurance_data = () => {
        var patientid = App.patientIdUsingUrl(2);
        if(patientid != ""){
            axios.get('/patient/'+patientid+'/insurance').then(e=>{
                App.set_input_value('#insurance-form',e.data);   
            });
        }
    };

    let update_patient_insurance = () => {
        $('#insurance-form').submit(e => {
            var url = $(e.target).attr('action');
            var formdata = App.serializeFormData($(e.target).serializeArray());
            axios.post(url,formdata).then(e=>{
                if(e.data.message === "saved" || e.data.message === "updated"){
                    App.messageModal('Successfuly Saved', '', 'success','');
                }
            });
            return e.preventDefault();
        });
    };






    // DATE OF SERVICE, DIAGNOSIS & ALLERGIES======================================================
    let patient_dataofserivice_data = ()=>{
        var patientid = App.patientIdUsingUrl(2);
        if(patientid != ""){
            axios.get('/patient/'+patientid+'/dsda').then(e=>{
                // console.log(e.data);
                App.set_input_value('#dsda-form',e.data);
            });
        }
    };


    let admit_type_btn = () => {
        // New Admission start at 1 to 50 while others is 2 to 50
        $('select#admit-type').on('change', (e) => {
            var certList = [];
            $('select#start-cert').html('');
            var val = $('#admit-type').val();
            if(val === ""){
                certList = [];
            }else if(val === "New Admission"){
                for(var i=1;i<=50;i++){
                    certList.push(i);
                }
            }else{
                for(var i=2;i<=50;i++){
                    certList.push(i);
                }
            }
            $('select#start-cert').append(`<option value=""></option>`);
            for(var key in certList){
                var htm = `<option value="`+certList[key]+`">`+certList[key]+`</option>`;
                $('select#start-cert').append(htm);
            }
        });


        // Add Recert Date base on Start Cert 
        $('select#start-cert').on('change',()=>{
            var val = $('#start-cert').val();
            var soc = $('#soc').val();
            if(soc === ""){
                App.messageModal('SOC Field is Empty!', '', 'warning','');
                $('#start-cert').val('');
            }else{
                if(val === "1" || val === "2"){
                    var recert = moment(soc).add(89,'days').format('MM/DD/YYYY');
                    $('#recert').val(recert);
                }else{
                    var recert = moment(soc).add(59,'days').format('MM/DD/YYYY');
                    $('#recert').val(recert);
                }
            }
        });

    };
    
    
    let update_patient_dateofservice_allergies = () => {
        $('#dsda-form').submit(e=>{
            var url = $(e.target).attr('action');
            var formdata = App.serializeFormData($(e.target).serializeArray());
            axios.post(url,formdata).then(e=>{
                console.log(e.data);
                if(e.data.message === "saved"){
                    App.messageModal('Successfuly Saved', '','success','');
                }
                if(e.data.message === "updated"){
                    App.messageModal('Successfuly Updated', '','success','');
                }
            });
            e.preventDefault();
        });
    };




    //PLACE OF SERVICE====================================================================
    let patient_placeofservice_data = () => {
        var patientid = App.patientIdUsingUrl(2);
        if(patientid != ""){
            axios.get('/patient/'+patientid+'/placeofservice').then(e=>{
                // console.log(e.data);
                App.set_input_value('#pos-form',e.data);
            });
        }
    };

    let update_patient_placeofservice = () => {
        $('#pos-form').submit(e=>{
            var url = $(e.target).attr('action');
            var formdata = App.serializeFormData($(e.target).serializeArray());
            axios.post(url,formdata).then(e=>{
                console.log(e.data);
                if(e.data.message === "saved"){
                    App.messageModal('Successfuly Saved', '','success','');
                }
                if(e.data.message === "updated"){
                    App.messageModal('Successfuly Updated', '','success','');
                }
            });
            e.preventDefault();
        });
    };



    // Authorized of  Rep (AR), Emergency Contact (EC)=============================================
    //Get AR EC Data 
    let get_arec_data = () => {
        var patientid = App.patientIdUsingUrl(2);
        if(patientid != ""){
            axios.get('/patient/'+patientid+'/arec').then(e=>{
                // console.log(e.data);
                App.set_input_value('#arec-form',e.data);
            }); 
        }     
    };

    //Save Upate AR EC
    let update_authorizedref_ec = ()=>{
        $('#arec-form').submit(e=>{
            var url = $(e.target).attr('action');
            var formdata = App.serializeFormData($(e.target).serializeArray());
            axios.post(url,formdata).then(e=>{
                console.log(e.data);
                if(e.data.message === "saved"){
                    App.messageModal('Successfuly Saved', '','success','');
                }
                if(e.data.message === "updated"){
                    App.messageModal('Successfuly Updated', '','success','');
                }
            });
            e.preventDefault();
        });
    };


    // REFERRAL SOURCE & ATTENDING MD===============================================================

    let get_staffList  = () => {
        $('#rsamd-type').on('change',e=>{
            var patientid = App.patientIdUsingUrl(2);
            if(patientid != ""){
                var val = $(e.target).val();
                if(val === "Medical Director" || val === "Referring MD/ Attending MD"){
                    $('#staff-list').html('');
                    axios.get('/patient/'+patientid+'/stafflist?discipline=md').then(e=>{
                        $('#staff-list').append('<option value=""></option>');
                        for(var key in e.data){
                            $('#staff-list').append(`<option value="`+e.data[key].id+`">`+e.data[key].name+`</option>`);
                        }
                    });  
                }else{
                    $('#staff-list').html('');
                    axios.get('/patient/'+patientid+'/stafflist?discipline=others').then(e=>{
                        $('#staff-list').append('<option value=""></option>');
                        for(var key in e.data){
                            $('#staff-list').append(`<option value="`+e.data[key].id+`">`+e.data[key].name+`</option>`);
                        }
                    });  
                }
            }
        });
    };

    let update_referral_source = () =>{
        $('#rsamd-form').submit(e=>{
            var url = $(e.target).attr('action');
            var formdata = App.serializeFormData($(e.target).serializeArray());
            axios.post(url,formdata).then(e=>{
                console.log(e.data);
            });
            e.preventDefault();
        });
    };




    //Vendors=========================================================================================
    let vendor_data = () => {
        var patientid = App.patientIdUsingUrl(2);
        if(patientid != ""){
            axios.get('/patient/'+patientid+'/vendor').then(e=>{
                // console.log(e.data);
                App.set_input_value('#vendors-form',e.data);
            });
        }
    };

    let update_vendor = () => {
        $('#vendors-form').submit(e =>{
            var url = $(e.target).attr('action');
            var formdata = App.serializeFormData($(e.target).serializeArray());
            axios.post(url,formdata).then(e=>{
                console.log(e.data);
            });
            return e.preventDefault();
        });
    };


    //Mortuary Information =====================================================================
    let mortuary_data = () =>{
        var patientid = App.patientIdUsingUrl(2);
        if(patientid != ""){
            axios.get('/patient/'+patientid+'/mortuary').then(e=>{
                App.set_input_value('#mortuary-form',e.data); 
            });
        }
    };

    let update_mortuary = () => {
        $('#mortuary-form').submit(e=>{
            var url = $(e.target).attr('action');
            var formdata = App.serializeFormData($(e.target).serializeArray());
            axios.post(url,formdata).then(e=>{
                console.log(e.data);
            });
            e.preventDefault();
        });
    };

















    //Return Functions ------------------------------
    return {
        initDOM : () => initDOM(),
        insurnace : () => {
            patient_insurance_data();
            update_patient_insurance();
        },
        dateofservice_diagnosisallergies : () => {
            admit_type_btn();
            patient_dataofserivice_data();
            update_patient_dateofservice_allergies();
        },
        place_of_service : () => {
            patient_placeofservice_data();
            update_patient_placeofservice();
        },
        authorized_rep_ec : () => {
            get_arec_data();
            update_authorizedref_ec();
        },
        referral_source_attendingmd : () => {
            get_staffList();
            update_referral_source();
        },
        vendor : () =>{
            vendor_data();
            update_vendor();
        },
        mortuary : () => {
            mortuary_data();
            update_mortuary();
        }
    };
}();


document.addEventListener('DOMContentLoaded',()=>{
    Patient.initDOM();
    Patient.insurnace();
    Patient.dateofservice_diagnosisallergies();
    Patient.place_of_service();
    Patient.authorized_rep_ec();
    Patient.referral_source_attendingmd();
    Patient.vendor();
    Patient.mortuary();
});