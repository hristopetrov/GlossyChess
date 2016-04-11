angular.module('chessApp')
    .controller('ProfileInfoController', ['$scope', '$rootScope' , 'ProfileInfoService', function ($scope, $rootScope, ProfileInfoService) {
        $scope.user = JSON.parse(window.localStorage.getItem('currentUser'));
        console.log($scope.user);
        $scope.image = 'images/profile1.jpg';
        $scope.score = $scope.user.score;
        $scope.numberOfPlayedGames = $scope.user.numberOfPlayedGames;
        $rootScope.showMenu = true;
        $scope.activeUsers = getActiveUsers();
        $scope.forEdit = false;
        $scope.rate = $scope.user.rating;
        $scope.isCollapsed = true;
        $scope.activeUsersLength = $scope.activeUsers !== undefined ? $scope.activeUsers.length : 0;
        $scope.maxSize = 5;
        $scope.bigCurrentPage = 1;
        $scope.challenges = [1, 2,3];

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

     /*   $scope.getNotifications = function(){
            setInterval(function(){
                ProfileInfoService.getNotifications()
                    .then(function success(response){
                        if(response.data.length > 0){

                        }
                    })


            }, 1000)

        }*/

        $scope.accept = function(username){
            /*ProfileInfoService.accept()
                .then(function(){
                    var buttonAccept = document.getElementById('accept');
                    buttonAccept.disabled = true;
                    buttonAccept.innerHTML = 'Waiting...';
                }, function(response){
                    console.log(response.error);
                })*/
        }
        
        $scope.decline = function (username) {
            ProfileInfoService.decline()
                .then(function (){
                    var element = document.getElementById(username)
                    element.parentNode.removeChild(element);
                })
        }


    }])