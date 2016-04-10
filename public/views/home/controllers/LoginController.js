angular.module('chessApp')
    .controller('LoginController', ['$scope', '$uibModalInstance', '$rootScope', '$location', 'authService',
        function ($scope, $uibModalInstance, $rootScope, $location, authService) {
            $scope.loginError = false;

            function login(user) {

                authService.login(user)
                    .then(function success(response){
                        $rootScope.showMenu = true;
                        window.location.href = '#/profile';
                        console.log(user);
                        $rootScope.user = user;
                        $uibModalInstance.close();
                    }, function error(response){
                        $scope.loginError = true;
                        $scope.errorMessage = response.error;
                    });


            }

        /*    $scope.forgottenPassword = function (email) {
                $scope.fPassword = true;
                $scope.message = '';
                $scope.show = false;
                usersService.forgottenPassword(email)
                    .then(function success(response){
                        $scope.message = response.data;//reponse.data = 'Successfully changed password!'
                        $scope.show = true;
                    }, function error(response) {
                        $scope.message = response.data; // response.data = 'please try again!'
                    })
            }*/

            $rootScope.logout = function () {
                $rootScope.showMenu = false;
                authService.logout();
                window.location.href = '#home';
            }

            $scope.ok = function () {
                login($scope.user);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);