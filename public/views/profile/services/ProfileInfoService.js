angular.module('chessApp')
    .factory('ProfileInfoService', [ '$http', function ($http) {
        var user = {};
        return{
            getInfo: function () {

                if (!user) {
                    var data = JSON.parse(localStorage.getItem('user'));
                    for (var i in data) {
                        user[i] = data[i];
                    }
                }

                return user;
            },

            getActiveGames: function () {
                var user = this.getInfo();
                return $http({
                    method: 'GET',
                    url:'api/freegames',
                    data: {
                        "api_token" : user.api_token
                    }
                });
            },

            enterGame: function(user, gameID){
                return $http.post('api/joingame', {"api_token": user.api_token,
                                                            "gameid": gameID});
            },

            getNotifications: function(){
                  //return $http.get('api/profile/notifications');
            },

            accept: function(){
                //return $http.post('api/profile/accept', {"challenger": challenger.username});
            },

            addGame: function(){
                return $http({
                    method: 'GET',
                    url:'api/freegames',
                    data: {
                        "api_token" : user.api_token
                    }
                });
            }

        }
    }])