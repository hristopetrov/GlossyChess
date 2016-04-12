angular.module('chessApp')
    .controller('ProfileInfoController', ['$scope', '$rootScope', 'ProfileInfoService', function ($scope, $rootScope, ProfileInfoService) {
        $scope.user = JSON.parse(window.localStorage.getItem('currentUser'));
        console.log($scope.user);
        $scope.image = 'images/profile1.jpg';
        $scope.score = $scope.user.score;
        $scope.numberOfPlayedGames = $scope.user.numberOfPlayedGames;
        $rootScope.showMenu = true;
        $scope.activeGames = getActiveGames();
        $scope.forEdit = false;
        $scope.rate = $scope.user.rating;
        $scope.isCollapsed = true;
        $scope.activeGamesLength = $scope.activeGames !== undefined ? $scope.activeGames.length : 0;
        $scope.maxSize = 5;
        $scope.bigCurrentPage = 1;
        $rootScope.challenges = [1, 2, 3, 4];
        $scope.waiting = false;

        $scope.saveImage = function (image) {
            //$http.post('../../api/users', {"username": $scope.username, "image": image}).then(...)
            $scope.image = image;
        }

        function getActiveGames() {
            ProfileInfoService.getActiveGames()
                .then(function success(response) {
                    console.log(response.data);
                    $scope.activeGames = response.data;
                }, function error(response) {
                    return;
                })
        }

        $scope.enterGame = function (gameID) {
            ProfileInfoService.enterGame(gameID)
                .then(function success() {
                    document.getElementById(gameID).disabled = true;
                    document.getElementById(gameID).innerHTML = 'Waiting...';
                    $scope.waiting = true;
                })

        }

        $scope.getNotifications = function () {
            setInterval(function () {
                ProfileInfoService.getNotifications()
                    .then(function success(response) {
                        if (response.data.length > 0) {
                            $rootScope.challenges = response.data;
                        }
                    })


            }, 1000)

        }

        $scope.accept = function (username) {
            /*ProfileInfoService.accept()
             .then(function(){
             var buttonAccept = document.getElementById('accept');
             buttonAccept.disabled = true;
             buttonAccept.innerHTML = 'Waiting...';
             }, function(response){
             console.log(response.error);
             })*/
        }

        /*    $scope.decline = function (username) {
         ProfileInfoService.decline()
         .then(function (){
         var element = document.getElementById(username)
         element.parentNode.removeChild(element);
         })
         }*/

        $scope.addRow = function () {
            ProfileInfoService.addGame()
                .then(function success(response) {
                    console.log(response);
                    var responseData = response.data.length;
                    $scope.activeGames.push(response.data[responseData]);

                })

        }


    }])