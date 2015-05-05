ChatRoomModule.controller('chat_controller', function ($scope, $modal, $log, socket) {
  $scope.messages = [];
  $scope.users = [];

  var modalInstance = $modal.open({
    templateUrl: '/templates/input_nickname.ejs',
    size: 'sm',
    controller: 'ModalInstanceCtrl'
  });

  modalInstance.result.then(function (nickname) {
    $scope.nickname = nickname;
  });

  $scope.send = function (message) {
    message = message || '';
    socket.emit('chat message', [$scope.nickname, message]);
    $scope.message = '';
  };

  socket.on('chat message', function (msg) {
    $scope.messages.push(msg[0] + ': ' + msg[1]);
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
