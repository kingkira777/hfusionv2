'use strict';

var Patient = function(){


    let initDOM = () => {
        console.log('PATIENT JS');

        patient_table_list();
        save_update_patient();
    };

    let patient_table_list = () =>{
        axios.get('/patients/patient-table-list').then(e=>{
            console.log(e.data);
            table_patient(e.data);
        });
    };


    let save_update_patient = () => {

        // UPDATE PATIENT INFO
        $('#update-patient-form').submit((e)=>{
            var url = $(e.target).attr('action');
            var formdata = App.serializeFormData($(e.target).serializeArray());
            axios.post(url,formdata).then(e =>{
                console.log(e.data);
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
    return {
        initDOM : () => initDOM()
    };
}();


document.addEventListener('DOMContentLoaded',()=>{
    Patient.initDOM();
});