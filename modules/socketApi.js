const socket_io = require('socket.io');
const io = socket_io();
var socketApi = {};


socketApi.io = io;

io.on('connection', function(socket){
    console.log('A user connected');
});

socketApi.sendNotification = function() {
    io.sockets.emit('message', { message: 'Connected to Chat APp'});
}

module.exports = socketApi;