angular.module('chessApp')
    .factory('loginService', ['usersService', function (usersService ) {

        var _identity;

        return {
            isLogged: function() {
                return !_identity;
            },

            login: function(email, password) {
                usersService.getUsers().then(function success(response) {

                    var objects = response.data;
                    console.log(objects.users);
                    console.log(objects.users.length);
                    for (var i =0; i < objects.users.length; i++) {
                        console.log('vutre sum');
                        if (objects.users[i].email == email && password == objects.users[i].password) {
                            _identity = objects.users[i];
                            return true;
                            break;
                        }
                    }
                    console.log('true');
                }, function error() {
                    return false;
                });
            },

            logout: function() {
               //$http.post('api/logout.php', {id: _identity.id})
               // .then(function(){
               //   _identity = null;
               //
               // )
                window.localStorage.removeItem('user');
            },

            makeNewRegistration: function (email, username) {

            }

        }
}]);