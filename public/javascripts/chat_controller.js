ChatRoomModule.controller('chat_controller', function ($scope, $modal, $log, socket) {
  $scope.messages = [];
  $scope.users = [];
  $scope.sendTo = 'global';

  var modalInstance = $modal.open({
    templateUrl : '/templates/input_nickname.ejs',
    size        : 'sm',
    backdrop    : 'static',
    controller  : 'ModalInstanceCtrl'
  });

  modalInstance.result.then(function (nickname) {
    $scope.nickname = nickname;
  });

  $scope.changeTarget = function (nickname) {
    $scope.sendTo = nickname;
  };

  $scope.send = function (message) {
    message = message || '';
    socket.emit('chat message', {
      name    : $scope.nickname,
      message : message,
      sendTo  : $scope.sendTo
    });
    $scope.message = '';
  };

  socket.on('chat message', function (msg) {
    var content = msg.name + ': ' + msg.message;
    if (msg.name === $scope.nickname) {
      if (msg.sendTo !== 'global')
        $scope.messages.push('[to ' + msg.sendTo + '] ' + content);
      else
        $scope.messages.push(content);
    } else {
      if (msg.sendTo === $scope.nickname)
        $scope.messages.push('[private] ' + content);
      else if (msg.sendTo === 'global')
        $scope.messages.push(content);
    }
  });

  socket.on('init users', function (users) {
    $scope.users = users;
  });

  socket.on('delete user', function (nickname) {
    $scope.users.splice($scope.users.indexOf(nickname), 1);
  });
});

ChatRoomModule.controller('ModalInstanceCtrl', function ($scope, $modalInstance, socket) {
  $scope.save_nickname = function () {
    var nickname = $scope.nickname || 'Anonymous';
    socket.emit('add user', nickname);
    $modalInstance.close(nickname);
  };
});
