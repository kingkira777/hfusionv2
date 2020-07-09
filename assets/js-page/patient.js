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
        axios.get('/patient/'+patientid+'/insurance').then(e=>{
            App.set_input_value('#insurance-form',e.data);   
        });
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
    let update_patient_dateofservice_allergies = () => {
        $('#dsda-form').submit(e=>{
            var url = $(e.target).attr('action');
            var formdata = App.serializeFormData($(e.target).serializeArray());
            console.log(formdata);
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
            update_patient_dateofservice_allergies();
        },
    };
}();


document.addEventListener('DOMContentLoaded',()=>{
    Patient.initDOM();
    Patient.insurnace();
    Patient.dateofservice_diagnosisallergies();
});