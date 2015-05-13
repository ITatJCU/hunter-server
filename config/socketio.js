var socketio = require('socket.io');
var LogEventDispatcher = require('../lib/utilities/log-event-dispatcher');

module.exports = function (server) {

    var io = socketio.listen(server.server);

    io.sockets.on('connection', function (socket) {
        LogEventDispatcher.log('Socket Connection Established: ' +  socket.handshake.address);
    });

    return io;
};