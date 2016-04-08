angular.module('chessApp')
    .controller('RegistrationController', ['$scope', '$uibModalInstance', '$window', 'authService',
        function ($scope, $uibModalInstance, $window, authService) {
        $scope.registrationEnd = false;
        $scope.success = false;
        function makeNewRegistration(user) {
            console.log(user);
            authService.register(user)
                .then(function success(response) {
                    $scope.message = 'Your registration was successful! Please login.' // =response.message
                    $scope.registrationEnd = true;
                    $scope.success = true;
                }, function error(response) {
                    $scope.message = 'This email or username is already taken!' // =response.message
                    $scope.registrationEnd = true;
                    $scope.success = false;
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