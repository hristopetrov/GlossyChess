angular.module('chessApp')
    .factory('challengeService', ['$http', function($http){
        function challenge(){
            return $http.post('api/')
        }
    }])