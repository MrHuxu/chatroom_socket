ChatRoomModule.controller('user_controller', function ($scope, socket) {
  $scope.users = [];

  socket.on('add user', function (nickname) {
    $scope.users.push(nickname);
  });
});