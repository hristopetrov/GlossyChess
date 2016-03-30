angular.module('chessApp')
    .controller('ProfileInfoController', ['$scope', 'ProfileInfoService', function ($scope, ProfileInfoService) {
        $scope.user = window.localstorage.getItem('user');
        $scope.image = $scope.user.imageURL;
        $scope.score = $scope.user.score;
        $root.showMenu = true;

        var forEdit = false;

        $scope.edit = function () {
            var forEdit = true;
        }

        $scope.saveImage = function (image) {
            //$http.post('../../api/users', {"username": $scope.username, "image": image}).then(...)
            $scope.image = image;

        }


    }])