exports.initSocketService = function (server) {
  var io = require('socket.io')(server);
  var users = [];

  // socket io message
  io.on('connection', function (socket) {
    socket.on('disconnect', function () {
      if (socket.nickname) {
        users.splice(users.indexOf(socket.nickname), 1);
        io.emit('delete user', socket.nickname);
        console.log('user ' + socket.nickname + ' disconnected');
      }
    });

    socket.on('chat message', function (msg) {
      io.emit('chat message', msg);
      console.log('name: ' + msg.name + ', message: ' + msg.message + ', sendTo: ' + msg.sendTo);
    });

    socket.on('add user', function (nickname) {
      io.emit('check duplicate', {name: nickname, index: users.indexOf(nickname)});
      if (users.indexOf(nickname) === -1) {
        socket.nickname = nickname;
        users.push(nickname);
        io.emit('init users', users);
        console.log('user ' + nickname + ' connected');
      }
    });
  });
};
