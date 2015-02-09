'use strict';

/**
 * @ngdoc function
 * @name lightAppApp.controller:startCtrl
 * @description
 * # startCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('startCtrl', function ($scope, Feeds, $filter) {
    
    Feeds.query(function(response) {
      $scope.feeds = response;
    });
    
    $scope.addFeed = function() {
      var newFeed = new Feeds({
        name: $scope.form.name,
        password: $scope.form.password,
        slug: $filter('slug')($scope.form.name),
        completed: false
      });
      newFeed.$save(function(post){
        $scope.feeds.push(post);
        $scope.writeNew = false;
        $scope.form = {name: '', password: ''};
      });
    };
    
  });
