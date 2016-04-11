angular.module('chessApp')
    .controller('GameViewController', ['$scope', '$rootScope',  function ($scope, $rootScope) {
        var connection = new WebSocket('ws://localhost:8088');

        $scope.takenFigures = '';
        $scope.user = $rootScope.user;
        console.log($scope.user.name);
        chessGame.init(connection);

        console.log('connection in game view controller: ', connection);

        connection.onopen = function (e) {
            console.log("Connection established!");
        };

        connection.onmessage = function (e) {
            chessGame.updateFigurePosition(JSON.parse(e.data));
        };
    }]);