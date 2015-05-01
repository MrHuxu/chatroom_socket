var ChatRoomModule = angular.module('chat_room_module', []);

ChatRoomModule.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

ChatRoomModule.controller('chat_controller', function ($scope, socket) {
  $scope.test = 'world';
  $scope.messages = [];

  socket.on('chat message', function (msg) {
    $scope.messages.push(msg);
  });

  $scope.send = function (message) {
    socket.emit('chat message', message);
    $scope.message = '';
  };
});