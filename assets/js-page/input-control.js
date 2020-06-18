'use strict';
document.addEventListener('DOMContentLoaded',()=>{
    
    //Date Picker 
    $('.datePicker').datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
    });
    $('.datePicker').datepicker( "option", "dateFormat", 'mm/dd/yy');

    
    // Input Mask
    $('.phone').mask('(00) 0000-0000'); //phoneno
    $('.cellno').mask('(00) 00000-0000'); //Cellphoneno
    $('.time').mask('00:00:00 a'); //Time
    $('.ssn').mask("999-99-9999"); //SSN
    $('.zipcode').mask('00000'); //Zipcode

});