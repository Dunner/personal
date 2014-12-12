'use strict';

/**
 * @ngdoc directive
 * @name lightApp.directive:moduleAdmin
 * @description
 * # moduleAdmin
 */
angular.module('lightApp')
  .directive('moduleAdmin', function (Auth, Session, Helper) {
    return {
      restrict: 'EA',
      link: function ($scope) {
        
        Session.get().$promise.then(function (data) {
          Auth.setStatus(data.status);
          
          $scope.auth = Auth;
          $scope.authenticated = Auth.getStatus();
          $scope.$watch('auth.getStatus()', function(newValue) {
            $scope.authenticated = newValue;
          });

          $scope.module = false;
          
          $scope.signin = function(form) {
            $scope.submitted = true;
            if(form.$valid) {
              Auth.login({
                password: $scope.password
              },
              function(err) {
                $scope.errors = {};
                if (!err) {
                  Auth.setStatus(true);
                  Helper.set({'message': 'You\'ve logged in!', 'color': 'green'});
                  $scope.module = false;
                } else {
                  Helper.set({'message': err.status, 'color': 'red'});
                }
            });
            }
          };
          
          $scope.logout = function() {
            Auth.logout(function(err) {
              if (!err) {
                Helper.set({'message': 'You\'ve logged out!', 'color': 'blue'});
                Auth.setStatus(false);
              }
            });
          };
            
        });
      },
      templateUrl: './views/admin.html'
    };
  });