'use strict';
const Insurance = function(){


    let initDOM = () =>{
        _insurance_list();

    };
    
    //Delete Insurance Data
    window._delete_insurance = (_id) => {
        App.deleteMessageModal('Delete', 'Are you sure you want to Delete this Data?','warning',(x)=>{
            if(x){
                axios.get('/insurance/delete-insurance?id='+_id).then((e)=>{
                    if(e.data.message === "deleted"){
                        App.messageModal('Deleted', 'Successfuly Deleted', 'success');
                    }
                    _insurance_list();
                })
            }
        });
    };  


    //Save Update Insurance
    let _save_update_insurance = () =>{
        $('#insurance-form').submit((e) =>{
            var url = $(e.target).attr('action');
            var formData = App.serializeFormData($(e.target).serializeArray());
            axios.post(url,formData).then((e)=>{
                console.log(e.data);
                if(e.data.message === "saved"){
                    App.messageModal('Save','Successfuly Saved','success',(e)=>{
                        if(e){
                            location.reload();
                        }
                    });
                }
                if(e.data.message === "updated"){
                    App.messageModal('Updated','Successfuly Updated','success');
                }
            });
            return e.preventDefault();
        });
    };

    //Get Insurance Table List
    let _insurance_list = () => {
        axios.get('/insurance/insurance-table-list',{
            onUploadProgress : function(e){
                console.log(e);
            }
        }).then((e)=>{
            console.log(e.data);
            _insuranceTable(e.data);
        });
    };


    //Render Insurance Table using DataTable Js
    let _insuranceTable = (data) => {
        $('#insurance-table').DataTable({
            data : data,
            columnDefs : [
                {
                    targets : [0],
                    data :data,
                    render : (e)=>{
                        return `
                            <a href="/insurance/add-update-insurance?id=`+e.insuranceid+`">
                                <i class="fa fa-edit"></i> Edit
                            </a>
                            <a onclick="_delete_insurance(`+e.id+`);" href="#">
                                <i class="fa fa-trash"></i> Remove
                            </a>
                        `;
                    }
                }
            ],
            columns : [
                { data : null, sTitle :''},
                { data : 'name', sTitle : 'Name'},
                { data : 'source', sTitle : 'Source Type'},
                { data : 'address', sTitle : 'Address'},
                { data : 'phone', sTitle : 'Phone'},
                { data : 'altphone', sTitle : 'Alt Phone'},
                { data : 'fax', sTitle : 'Fax'},
                { data : 'email', sTitle : 'Email'}
            ],
            bDestroy : true
        });
    };

    return {
        _initDOM : () => initDOM(),
        _save_update_insurance : () => _save_update_insurance()
    };

}();

document.addEventListener('DOMContentLoaded',()=>{
    Insurance._initDOM();
    Insurance._save_update_insurance();
});