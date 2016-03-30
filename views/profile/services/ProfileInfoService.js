angular.module('chessApp')
    .factory('ProfileInfoService', [ '$http', function ($http) {
       // $scope.user = localStorage.getItem('user');
        return{
            getInfo: function () {
                return user;
            },

            getActiveUsers: function () {
                return $http.get('../../../json/users.json'); // active users.php
            }
        }
    }])