angular.module('chessApp')
    .controller('LoginController', ['$scope', '$uibModalInstance', '$rootScope', '$location', 'authService', 'identityService',
        function ($scope, $uibModalInstance, $rootScope, $location, authService, identityService) {
            $scope.user = {};

            function login(user) {
                //$scope.loginError = false;
                //// var success = false;
                ////console.log(usersService.login(user.email, user.password));
                //usersService.login(user.email, user.password)
                //    .then(function success(response) {
                //       // $scope.loginError = false;
                //        $scope.user = response.data.users[0];
                //        console.log($scope.user);
                //        $rootScope.user = $scope.user;
                //        window.sessionStorage.setItem('user', JSON.stringify($scope.user));
                //        //console.log(window.localStorage.getItem('user'))
                //        $rootScope.showMenu = true;
                //        window.location.href = '#/profile';
                //        $uibModalInstance.close();
                //    }, function error() {
                //        $scope.loginError = true;
                //    })

                authService.login(user);
                $rootScope.showMenu = true;
                window.location.href = '#/profile';
                $uibModalInstance.close();

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
              /*  window.sessionStorage.removeItem('user');*/
                authService.logout();
                window.location.href = '#home';
            }

            $scope.ok = function () {
                login($scope.user);
                //$uibModalInstance.close();
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);