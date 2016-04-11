angular.module('chessApp')
    .controller('ProfileInfoController', ['$scope', '$rootScope' , 'ProfileInfoService', function ($scope, $rootScope, ProfileInfoService) {
        $scope.user = JSON.parse(window.localStorage.getItem('currentUser'));
        console.log($scope.user);
        //$scope.image = $scope.user.imageURL;
        $scope.score = $scope.user.score;
        $scope.numberOfPlayedGames = $scope.user.numberOfPlayedGames;
        $rootScope.showMenu = true;
        $scope.activeUsers = getActiveUsers();
        //console.log($scope.activeUsers);
        $scope.forEdit = false;
        $scope.rate = $scope.user.rating;
        $scope.isCollapsed = true;
        $scope.activeUsersLength = $scope.activeUsers !== undefined ? $scope.activeUsers.length : 0;
        $scope.maxSize = 5;
        $scope.bigCurrentPage = 1;
        $scope.challenges = getChallenges();

        $scope.saveImage = function (image) {
            //$http.post('../../api/users', {"username": $scope.username, "image": image}).then(...)
            $scope.image = image;
        }

        function getActiveUsers() {
            ProfileInfoService.getActiveUsers()
                .then(function success(response) {
                    console.log(response.data);
                    $scope.activeUsers =  response.data;
                }, function error(response) {
                    return;
                })
        }

        $scope.challenge = function (user) {
            //ProfileInfoService.challenge(user);

        }

        $scope.getChallenges = function(){
            setInterval(function(){
                ProfileInfoService.getNotifications()
                    .then(function success(response){

                    })


            }, 1000)

        }


    }])