'use strict';

var Chat = function(){
    var socket = io('/');

    
    var _chatBtn = () => {
        $('#chat-msg').on('click',()=>{
            socket.emit('message',{ message : 'New Message'});
        });
    };



    // Chat for the users (not included the practioners)
    var _chat = () =>{
        socket.on('connection',(client)=>{
            console.log(client);
        });
    };

    return {
        chat : () =>  _chat(),
        chatBtn : () => _chatBtn()
    }

}();


document.addEventListener('DOMContentLoaded',()=>{
    Chat.chat();
    Chat.chatBtn();
});