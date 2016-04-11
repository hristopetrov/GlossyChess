angular.module('chessApp')
    .controller('HomeController', function ($scope, $uibModal){
        $scope.animationsEnabled = true;
        $scope.notifications = [];

        $scope.openLoginModal = function () {

            var loginModal = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/home/views/LoginModalView.html',
                controller: 'LoginController',
                size: 'md'
            });
        };

        $scope.openRegisterModal = function () {

            var registerModal = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/home/views/RegistrationModalView.html',
                controller: 'RegistrationController',
                size: 'md'
            });
        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };
    });