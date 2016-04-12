angular.module('chessApp')
    .controller('GameViewController', ['$scope', '$rootScope',  function ($scope, $rootScope) {
        var connection = new WebSocket('ws://localhost:8088');
        //var socket = io();
        $scope.takenFigures = '';
        $scope.user = $rootScope.user;
        chessGame.init(connection);

        connection.onopen = function (e) {
            console.log("Connection established!");
        };

        connection.onmessage = function (e) {
            chessGame.updateFigurePosition(JSON.parse(e.data));
        };


    }]);