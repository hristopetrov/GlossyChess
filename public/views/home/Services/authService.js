chessApp.factory('authService',function($http, $q, identityService){

    var TOKEN_KEY = 'authentication'; // cookie key



    var register = function register(user){

        var deferred = $q.defer();

        $http.post('/api/user/register', user)
            .success(function(response){
                deferred.resolve(response);
            })
            .error(function(err){
                deferred.reject(err)
            })

        return deferred.promise;
    };

    var login = function login(user) {
        var deferred = $q.defer();

        var data = user ;//"grant_type=password&username=" + (user.username || '') + '&password=' + (user.password || '');
        // data - formata v koito survura o4akva dannite


        $http.post('/api/user/login', data)
            .success(function (response) {
                var tokenValue = response.api_token;  // tokena koito mi vru6ta api-to
                console.log(response);
                var theBigDay = new Date();
                theBigDay.setHours(theBigDay.getHours() + 72);

                //window.localStorage.setItem('currentUser', tokenValue);
                window.localStorage.setItem('currentUser', JSON.stringify(response));
                // save cookie

                $http.defaults.headers.common.Authorization = 'Bearer ' + tokenValue;
                // slagam ob6t header koito vseki put se izpra6ta
                deferred.resolve(data);

            })
            .error(function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    };



    return {
        register: register, // tuk se podava user
        login: login,
        isAuthenticated: function () {
            return !!window.localStorage.getItem('currentUser');
        },
        logout: function () {
            window.localStorage.removeItem('currentUser');   // iztrivame cookie - to
            $http.defaults.headers.common.Authorization = null; // iztrivame header-a
            identityService.removeUser(); // currentUser = {};
        }
    };

});