'use strict';

var chessApp = angular.module('chessApp', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'ui.bootstrap',
    'chessAppDirectives'
]);

angular.module('chessApp')
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                when('/home', {
                    templateUrl: 'views/home/views/home-view.html',
                    controller: 'HomeController'
                })
                .when('/profile',{
                        templateUrl: 'views/profile/views/profileView.html',
                        controller: 'ProfileInfoController'
                    }
                )
                .otherwise({
                    redirectTo: '/home'
                });
        }]);