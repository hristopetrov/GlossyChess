angular.module('chessApp')
    .controller('GameViewController', ['$scope', 'socket', function($scope, socket){
        chessGame.init();

        socket.onopen = function () {
            //Attach socket events here
        }
    }]);