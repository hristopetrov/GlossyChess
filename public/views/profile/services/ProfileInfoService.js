angular.module('chessApp')
    .factory('ProfileInfoService', [ '$http', function ($http) {
       // $scope.user = localStorage.getItem('user');
        return{
            getInfo: function () {
                return user;
            },

            getActiveGames: function () {
                return $http.get('api/freegames');
            },

            enterGame: function(user){
                return $http.post('json/activeUsers.json', {"username": user.username});
            },

            getNotifications: function(){
                  //return $http.get('api/profile/notifications');
            },

            accept: function(){
                //return $http.post('api/profile/accept', {"challenger": challenger.username});
            },

            addGame: function(user){
                //return $http.post('api/profile', {"user": user});
            }

        }
    }])