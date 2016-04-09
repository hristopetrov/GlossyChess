angular.module('chessApp')
    .controller('GameViewController', ['$scope', '$rootScope', 'socket', function ($scope, $rootScope, socket) {
        $scope.takenFigures = '';
        $scope.user = $rootScope.user;
        chessGame.init();

        var conn = new WebSocket('ws://localhost:8088');
        conn.onopen = function (e) {
            console.log("Connection established!");
        };

        conn.onmessage = function (e) {
            chessGame.updateFigurePosition(e.data);
        };
    }]);