angular.module('chessApp')
    .factory('ProfileInfoService', [ '$http', function ($http) {
       // $scope.user = localStorage.getItem('user');
        return{
            getInfo: function () {
                return user;
            },

            getActiveUsers: function () {
                return $http.get('json/activeUsers.json'); // if we had a server : activeUsers.php
            },

            challenge: function(user){
                return $http.post('json/activeUsers.json', {"username": user.username}) // if we had server : ...
            }
        }
    }])