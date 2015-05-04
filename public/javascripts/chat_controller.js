ChatRoomModule.controller('chat_controller', function ($scope, $modal, $log, socket) {
  $scope.messages = [];

  socket.on('chat message', function (msg) {
    $scope.messages.push(msg);
  });

  var modalInstance = $modal.open({
    templateUrl: '/templates/input_nickname.ejs',
    size: 'sm',
    controller: 'ModalInstanceCtrl'
  });

  modalInstance.result.then(function (nickname) {
    $scope.nickname = nickname || 'Anonymous';
  });

  $scope.send = function (message) {
    message = message || '';
    socket.emit('chat message', $scope.nickname + ': ' + message);
    $scope.message = '';
  };
});

ChatRoomModule.controller('ModalInstanceCtrl', function ($scope, $modalInstance, socket) {
  $scope.save_nickname = function () {
    socket.emit('add user', $scope.nickname);
    $modalInstance.close($scope.nickname);
  };
});
