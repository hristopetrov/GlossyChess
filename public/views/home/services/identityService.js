chessApp.factory('identityService',function($http, $q){
    var currentUser = {};
    //var currentUser = {
    //    name:'Drasho',
    //    money: 5000,
    //    rank: 5,
    //    level: 10,
    //    picture: 5,
    //    bestScore: 2405,
    //    experience: '248/1000',
    //    email: 'drashoo@abv.bg',
    //    games: 15
    //};

    var deferred = $q.defer();

    return {
        getUser: function () {
            if (this.isAuthenticated()) {
                return $q.resolve(currentUser);  
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
        removeUser: function () {
            currentUser = {};
            deferred = $q.defer();
        }
    }

});