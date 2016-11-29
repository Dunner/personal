'use strict';

/**
 * @ngdoc directive
 * @name lightApp.directive:moduleAdmin
 * @description
 * # moduleAdmin
 */
angular.module('lightApp')
  .directive('moduleAdmin', function ($stateParams, Auth, Session, Helper) {
    return {
      restrict: 'EA',
      link: function ($scope) {
        

        $scope.auth = Auth;
        $scope.$watch('auth.canEdit', function(newValue) {
          $scope.authenticated = newValue;
        });

        $scope.module = false;
        
        $scope.signin = function(form) {
          $scope.submitted = true;
          if(form.$valid) {
            Auth.login({
              feed: $stateParams.slug,
              password: $scope.password
            },
            function(req) {
              if (req.status != 401) {
                Helper.set({'message': req.message, 'color': 'green'});
                Auth.canEdit = true;
                $scope.module = false;
              } else {
                Helper.set({'message': req.data.message, 'color': 'red'});
              }
          });
          }
        };
        
        $scope.logout = function() {
          Auth.logout(function(err) {
            if (!err) {
              Helper.set({'message': 'You\'ve logged out!', 'color': 'blue'});
              Auth.canEdit = false;
            }
          });
        };
            
      },
      templateUrl: './views/admin.html'
    };
  });