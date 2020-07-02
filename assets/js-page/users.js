'use strict';
let Users = function(){


    let initDOM = () =>{

        save_update_users();
    };



    let save_update_users = () => {


        $('#discipline-form').submit((e)=>{

        }); 

    };

    return {
        initDOM : () => initDOM()
    }
}();


document.addEventListener('DOMContentLoaded',()=>{
    Users.initDOM();
});