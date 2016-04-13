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

            enterGame: function(gameID){
                //add gameId to localStorage
                localStorage.setItem('gameID', gameID);
                window.location.href = '#/game'; //premahni za da se vurjej s ico

                return $http.get('api/joingame', {"api_token" : this.getInfo().api_token,
                                                    "gameid": gameID});
            },

            getNotifications: function() {
               var gameID = localStorage.getItem('gameID');
                if(!gameID){
                    return;
                }

                return $http.get('api/checkgame/' + gameID, {
                    "api_token" : this.getInfo().api_token
                })
            },

            accept: function(){
                //return $http.post('api/profile/accept', {"challenger": challenger.username});
            },

            addGame: function(){
                return $http({
                    method: 'GET',
                    url:'api/newgame',
                    data: {
                        "api_token" : this.getInfo().api_token
                    }
                });
            }

        }
    }])