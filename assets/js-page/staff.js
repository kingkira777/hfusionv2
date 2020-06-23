'use strict';

let Staff = function(){


    let initDOM = () =>{
        console.log('Staff JS');
        staff_table_list();
        save_update_staff();
    };

    window.remove_staff = (staffid) =>{
        App.deleteMessageModal('Remove Staff?', 'Are you sure you want to remove this staff?','warning',(x)=>{
            if(x){
                axios.get('/staff/remove-staff?id='+staffid).then((e)=>{
                    console.log(e.data);
                    if(e.data.message === "deleted"){
                        App.messageModal('Removed', 'Successfuly Removed!', 'success');
                    }
                });
                staff_table_list();
            }
        });
    };  


    let staff_table_list = () => {
        axios.get('/staff/staff-table-list').then(e=>{
            // console.log(e.data);
            table_staff(e.data);
        });
    };

    let save_update_staff = () => {
        $("#staff-form").submit((e)=>{
            console.log(e.target);
            var url = $(e.target).attr('action');
            var formdata = App.serializeFormData($(e.target).serializeArray());
            axios.post(url,formdata).then((e)=>{
                console.log(e.data); 
                if(e.data.message === "saved"){
                    App.messageModal('Saved', 'Successfuly Saved', 'success',(x)=>{
                        if(x){
                            location.reload();
                        }
                    });
                }
                if(e.data.message === "updated"){
                    App.messageModal('Updated', 'Successfuuly Updated', 'success');
                }
            });
            return e.preventDefault();
        });
    };


    let table_staff = (data)=>{
        $("#table-staff").DataTable({
            data :data,
            columnDefs : [
                {
                    targets : [0],
                    data :data,
                    render : (e)=>{
                        return `
                            <a href="/staff/add-update?id=`+e.staffid+`">
                                <i class="fa fa-edit"></i> Edit
                            </a>
                            <a onclick="remove_staff('`+e.staffid+`');" href="#">
                                <i class="fa fa-trash"></i> Remove
                            </a>
                        `;
                    }
                }
            ],
            columns: [
                { data : null},
                { data : 'name', sTitle : 'NAME'},
                { data : 'dob', sTitle : 'DOB'},
                { data : 'discipline', sTitle : 'DISCIPLINE'},
                { data : 'phone', sTitle : 'PHONE#'},
                { data : 'cellno', sTitle : 'CELLNO'},
                { data : 'hiredate', sTitle : 'HIRE DATE'},
                { data : 'termination', sTitle : 'TERMINATION DATE'},
                { data : 'address', sTitle : 'ADDRESS'}, 
            ],
            bDestroy : true
        })
    };

    return {
        initDOM : () => initDOM()
    }
}();


document.addEventListener('DOMContentLoaded',()=>{
    Staff.initDOM();
});