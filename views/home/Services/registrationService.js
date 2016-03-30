angular.module('chessApp')
    .factory('registrationService', ['$http', 'usersService', function($http, usersService){
        return{
            makeNewRegistration: function successfulRegistration() {
                if(this.nonExistingUser(user.email, user.username)){
                    return $http.post('../../json/register.json');

                }
            }
        }
    }])