angular.module('chessApp')
    .controller('RegistrationController', ['$scope', '$uibModalInstance', '$window', 'usersService', function ($scope, $uibModalInstance, $window, usersService) {
        $scope.registrationMessage = '';
        $scope.registrationEnd = false;
        $scope.user = {};
        function makeNewRegistration(user) {

            usersService.makeNewRegistration(user.email, user.username, user.password)
                .then(function success(response) {
                    $scope.message = 'Your registration was successful! Please login.' // =response.message
                    $scope.registrationEnd = true;
                }, function (response) {
                    $scope.message = 'This email or username is already taken!' // =response.message
                    $scope.registrationEnd = true;
                })

        }

        $scope.ok = function (user) {
            makeNewRegistration(user);
            //$uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);