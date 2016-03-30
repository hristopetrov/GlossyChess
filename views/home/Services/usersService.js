angular.module('chessApp')
    .factory('usersService', [ '$http', function ($http) {


        return {

            login: function(email, password) {
               // return $http.post('../../json/login.json',{'email': email, 'password': password});
                return $http.get('chess-angular/json/users.json');
            },

           logout: function(username) {
               return $http.post('../../json/logout.json', {'username': username});
            },

            makeNewRegistration: function (email, username, password) {
                return $http.post('../../json/register.json', {'email': email, 'username': username, 'password': password});
            },

            forgottenPassword: function (email) {
                return $http.post('../json/forgottenPassword.json', {'email': email});
            }

        }
    }]);