'use strict';

var Patient = function(){


    let initDOM = () => {
        console.log('PATIENT JS');
    };


    let save_update_patient = () => {
        axios.post('','').then((e)=>{
            console.log(e.data);
        });
    };

    let table_patient = (data) => {
        $('').DataTable({
            data : data,
            columns :[
                
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