chessApp.factory('identityService',function($http, $q){
    var currentUser = {};

    var deferred = $q.defer();

    return {
        getUser: function () {
            if (this.isAuthenticated()) {
                deferred.resolve(currentUser);
            }

            return deferred.promise;
        },
        isAuthenticated: function () {
            return Object.getOwnPropertyNames(currentUser).length !== 0;
        },
        setUser: function (user) {
            currentUser = user;
            deferred.resolve(user);
        },
        removeUser: function (response) {
            currentUser = {};
            deferred = $q.defer();

        }
    }

});