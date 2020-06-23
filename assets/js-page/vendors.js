'use strict';

let Vendor = function(){

    let initDOM = function(){

        vendor_table_list();
        save_update_vendor();
    };
    
    
    window.delete_vendor = (_id) => {
        App.deleteMessageModal('Delete Vendor','Are you sure you want to Delete this Vendor?','warning',(x)=>{
            if(x){
                axios.get('/vendors/remove-vendor?id='+_id).then(e=>{
                    if(e.data.message === "deleted"){
                        App.messageModal('Deleted','Successfuly Deleted','success');
                    }
                    vendor_table_list();
                });
            }
        });
    };

    //GET VENDOR TABLE LIST
    let vendor_table_list = () =>{
        axios.get('/vendors/vendor-table-list')
        .then(e=>{
            console.log(e.data);
            table_vendor(e.data);
        });
    };


    //SAVE UPDATE VENDOR
    let save_update_vendor = () => {
        $('#vendor-form').submit((e)=>{
            var url = $(e.target).attr('action');
            var formdata = App.serializeFormData($(e.target).serializeArray());
            axios.post(url,formdata).then(e=>{
                if(e.data.message === "saved"){
                    App.messageModal('Saved', 'Successfuly Saved', 'success',(x)=>{
                        if(x){
                            location.reload();
                        }
                    });
                }
                if(e.data.message === "updated"){
                    App.messageModal('Updated', 'Successfuly Updated', 'success');
                }
            });
            return e.preventDefault();
        });
    };


    // TABLE VENDOR
    let table_vendor = (data) => {
        $('#vendor-table').DataTable({
            data : data,
            columnDefs : [
                {
                    targets : [0],
                    data :data,
                    render : (e)=>{
                        return `
                            <a href="/vendors/add-update?id=`+e.vendorid+`">
                                <i class="fa fa-edit"></i> Edit
                            </a>
                            <a onclick="delete_vendor(`+e.id+`);" href="#">
                                <i class="fa fa-trash"></i> Remove
                            </a>
                        `;
                    }
                }
            ],
            columns : [
                { data : null},
                { data : 'name', sTitle : 'NAME'},
                { data : 'type', sTitle : 'TYPE'},
                { data : 'address', sTitle : 'ADDRESS'},
                { data : 'phone', sTitle : 'PHONE#'},
                { data : 'email', sTitle : 'EMAIl'},
                { data : 'cperson', sTitle : 'CONTACT PERSON'},
            ],
            bDestroy : true
        })
    };

    return {
        initDOM : () => initDOM(),
    };

}();



document.addEventListener('DOMContentLoaded',()=>{
    Vendor.initDOM();
});