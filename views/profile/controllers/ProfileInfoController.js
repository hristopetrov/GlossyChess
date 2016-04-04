angular.module('chessApp')
    .controller('ProfileInfoController', ['$scope', '$rootScope' , 'ProfileInfoService', function ($scope, $rootScope, ProfileInfoService) {
        $scope.user = JSON.parse(window.localStorage.getItem('user'));
        $scope.image = $scope.user.imageURL;
        $scope.score = $scope.user.score;
        $scope.numberOfPlayedGames = $scope.user.numberOfPlayedGames;
        $rootScope.showMenu = true;
        $scope.activeUsers = getActiveUsers();
        $scope.forEdit = false;

        $scope.edit = function () {
            $scope.forEdit = $scope.forEdit === false ? true: false;
        }

        $scope.saveImage = function (image) {
            //$http.post('../../api/users', {"username": $scope.username, "image": image}).then(...)
            $scope.image = image;
        }

        function getActiveUsers() {
            ProfileInfoService.getActiveUsers()
                .then(function success(response) {
                    $scope.activeUsers = response.data;
                }, function error(response) {
                    return;
                })
        }

        $scope.challenge = function (user) {
            //ProfileInfoService.challenge(user);
            
        }



    }])