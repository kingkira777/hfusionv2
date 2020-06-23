'use strict';

const App = function () {




    //Delete Confimation Message Modal
    let deleteMessageModal = (title,text,type,fnCallback) => {
        swal({
            title: title,
            text: text,
            type: type,
            showCancelButton: true,
            cancelButtonClass: "btn-danger",
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }, fnCallback);
    };


    // Message MODAL
    let messageModal = (title, message, type,callBack) => {
        swal({title, message, type},callBack);
    };


    // Convert Date Format using Moment Js
    let convertDateFormat = (date,format) =>{
        try{
            var newdate = moment(date).format(format);
            return newdate;
        }catch(e){
            return e;
        }
    };

    
    // Serialize Form Data
    let serializeFormData = (data)=>{
        var newFormData ={};
        if(typeof(data) != "object"){
           console.log('Formdata is not an array to serialize');
           return; 
        }
        
        if(data.length === 0){
            return newFormData;
        }else{
            for(var i=0; i<data.length; i++){
                newFormData[data[i].name] = data[i].value;
            }
        }
        return newFormData;
    };


    //Return the Functions
    return {
        messageModal: (title, message, type,callBack) => messageModal(title, message, type,callBack),
        deleteMessageModal: (title,text,type,fnCallback) => deleteMessageModal(title,text,type,fnCallback),
        convertDateFormat : (date,format) => convertDateFormat(date,format),
        serializeFormData : (data) => serializeFormData(data),
    }


}();

