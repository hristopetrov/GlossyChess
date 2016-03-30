angular.module('chessApp')
    .controller('LoginController', ['$scope', '$uibModalInstance', '$rootScope', '$location', 'usersService',
        function ($scope, $uibModalInstance, $rootScope, $location, usersService) {
            $scope.user = {};

            function login(user) {
                $scope.loginError = false;
                // var success = false;
                //console.log(usersService.login(user.email, user.password));
                usersService.login(user.email, user.password)
                    .then(function success(response) {
                        $scope.user = response.data.users[0];
                        $rootScope.user = $scope.user;
                        window.localStorage.setItem('user', $scope.user);
                        $rootScope.showMenu = true;
                        $window.location.href = '#/profile';

                    }, function error() {
                        $scope.loginError = true;
                    })

            }

            $scope.forgottenPassword = function (email) {
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
            }

            $scope.ok = function () {
                login($scope.user);
                //$uibModalInstance.close();
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);