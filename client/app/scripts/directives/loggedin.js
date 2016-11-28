'use strict';

/**
 * @ngdoc directive
 * @name lightApp.directive:ifLoggedin
 * @description
 * # ifLoggedin
 */
angular.module('lightApp')
  .directive('ifLoggedin', function (Auth, $rootScope) {
    return {
      restrict: 'EA',
      link: function ($scope, $element) {
        
        $scope.auth = Auth;
        $scope.$watch('auth.getStatus()', function(newValue) {
          if (newValue == $rootScope.feedId && typeof $rootScope.feedId === 'string') {
            $element.removeClass('ng-hide');
            $element.addClass('ng-show');
          } else {
            $element.removeClass('ng-show');
            $element.addClass('ng-hide');
          }
        });
        
      }
    };
  });