angular.module('chessAppDirectives', [])
    .directive('pwCheck', [function () {
        return {
            require: 'ngModel',
            scope: {
              otherModelValue: '=compareTo'
            },
            link: function (scope, elem, attrs, ngModel) {
                ngModel.$validators.compareTo = function(modelValue) {
                    ngModel.$setValidity('pw', modelValue == scope.otherModelValue.$viewValue);
                    return modelValue == scope.otherModelValue.$viewValue;
                };

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        }
    }])
    .directive('chessBoard', [function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/chessBoard.html'
        }
    }]);