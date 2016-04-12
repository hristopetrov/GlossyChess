chessApp.factory('authService', function ($http, $q, $rootScope, identityService) {

    var TOKEN_KEY = 'authentication'; // cookie key


    var register = function register(user) {

        var deferred = $q.defer();

        $http.post('/api/user/register', user)
            .success(function (response) {
                deferred.resolve(response);
            })
            .error(function (err) {
                deferred.reject(err)
            })

        return deferred.promise;
    };

    var login = function login(user) {
        var deferred = $q.defer();

        var data = user;//"grant_type=password&username=" + (user.username || '') + '&password=' + (user.password || '');
        // data - formata v koito survura o4akva dannite


        $http.post('/api/user/login', data)
            .success(function (response) {
                var tokenValue = response.api_token;
                var theBigDay = new Date();
                theBigDay.setHours(theBigDay.getHours() + 72);
                window.localStorage.setItem('currentUser', JSON.stringify(response));
                $http.defaults.headers.common.Authorization = 'Bearer ' + tokenValue;
                deferred.resolve(data);

            })
            .error(function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    };


    return {
        register: register,
        login: login,
        isAuthenticated: function () {
            return !!window.localStorage.getItem('currentUser');
        },
        logout: function () {
            var deferred = $q.defer();
            $http.post('api/user/logout', {"userId": $rootScope.user.id})
                .success(function () {
                    window.localStorage.removeItem('currentUser');
                    $http.defaults.headers.common.Authorization = null;
                    identityService.removeUser();
                    deferred.resolve();
                })
                .error(function(err){
                    deferred.reject(err);
                });

            return deferred.promise;
        }
    };

});