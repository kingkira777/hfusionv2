'use strict';
let Users = function(){


    let initDOM = () =>{

        save_update_users();
        user_table_list();


        //DISCIPLINE SELECT
        $('#discipline-select').on('change',(e)=>{
            var val = $('#discipline-select :selected')[0].innerText;
            val = val.split('(')[0];
            $('#user-name').val(val);
        });

    };


    let user_table_list = () => {
        axios.get('/users/user-table-list').then(e=>{
            console.log(e.data);
            userTable(e.data);
        });
    };

    let save_update_users = () => {

        // ADD / UPDATE DISCIPLINE USER ======================================
        $('#discipline-form').submit((e)=>{
            var url = $(e.target).attr('action');
            var formdata = App.serializeFormData($(e.target).serializeArray());
            if(formdata.discipline === ""){
                App.messageModal('Discipline is Empty ','','warning','');
            }else if(formdata.email === ""){
                App.messageModal('Email Address is Empty','','warning','');
            }else if(formdata.username === ""){
                App.messageModal('Username is Empty','','warning','');
            }else if(formdata.password === "" || formdata.repassword === ""){
                App.messageModal('Password Field(s) is Empty','','warning',(e)=>{});
            }else if(formdata.password != formdata.repassword){
                App.messageModal('Password not Matched!','','warning','');
            }else{
                axios.post(url,formdata).then(e=>{
                    console.log(e.data);
                    if(e.data.message === "saved"){
                        App.messageModal('Successfuly Saved','','success',(x)=>{
                            if(x){
                                location.reload();
                            }
                        });
                    }
                    if(e.data.message === "existed"){
                        App.messageModal('User is Already Exist!','','warning');
                    }
                });
            }
            return e.preventDefault();
        }); 


        // ADD / UPDATE USER FORM==============================================
        $('#user-form').submit((e)=>{
            var url = $(e.target).attr('action');
            var formdata = App.serializeFormData($(e.target).serializeArray());
            if(formdata.accesslevel === ""){
                App.messageModal('Access Leve is Empty!','','warning','');
            }else if(formdata.name === ""){
                App.messageModal('Name is Empty!','','warning','');
            }else if(formdata.email === ""){
                App.messageModal('Email is Empty!','','warning','');
            }else if(formdata.username === ""){
                App.messageModal('Username is Empty!','','warning','');
            }else if(formdata.password === "" || formdata.repassword === ""){
                App.messageModal('Password Field(s) is Empty!','','warning','');
            }else if(formdata.password != formdata.repassword){
                App.messageModal('Password not Matched!','','warning','');
            }else{
                axios.post(url,formdata).then(e =>{
                    if(e.data.message === "saved"){
                        App.messageModal('Successfuly Saved','','success','');
                    }
                    if(e.data.message === "existed"){
                        App.messageModal('Successfuly Existed','','warning','');
                    }
                });
            }
            return e.preventDefault();
        });

    };

    let userTable = (data) => {
        $('#user-table').DataTable({
            data : data,
            columnDefs : [
                {
                    targets : [4],
                    data : data,
                    render : (e) => {
                        return `<a href='#'>
                                    <i class="fa fa-send"></i> SEND
                                </a>
                                <a href="/users/add-update?id=`+e.userid+`">
                                    <i class="fa fa-edit"></i> EDIT
                                </a>
                                <a href='#'>
                                    <i class="fa fa-trash"></i> DELETE
                                </a>`;
                    }   
                }
            ],
            columns : [
                { data : 'name', sTitle : 'Name'},
                { data : 'username', sTitle : 'Username'},
                { data : 'email', sTitle : 'Email'},
                { data : 'access_level', sTitle : 'Privilage'},
                { data : null},
            ],
            bDestroy : true
        });
    };

    return {
        initDOM : () => initDOM()
    }
}();


document.addEventListener('DOMContentLoaded',()=>{
    Users.initDOM();
});