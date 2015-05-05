exports.initSocketService = function (server) {
  var io = require('socket.io')(server);
  var users = [];

  // socket io message
  io.on('connection', function (socket) {
    socket.on('disconnect', function () {
      users.splice(users.indexOf(socket.nickname), 1);
      io.emit('delete user', socket.nickname);
      console.log('user ' + socket.nickname + ' disconnected');
    });

    socket.on('chat message', function (msg) {
      console.log('message: ' + msg.name + ' ' + msg.message + ' ' + msg.sendTo);
      io.emit('chat message', msg);
    });

    socket.on('add user', function (nickname) {
      socket.nickname = nickname;
      users.push(nickname);
      console.log('user ' + nickname + ' connected');
      io.emit('init users', users);
    });
  });
};
