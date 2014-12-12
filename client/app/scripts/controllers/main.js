'use strict';

/**
 * @ngdoc function
 * @name lightAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('MainCtrl', function ($scope, Auth, Posts) {
    
    $scope.writeNew = false;
    $scope.readingId = '';
    
    $scope.auth = Auth;
    $scope.status = Auth.getStatus();
    $scope.$watch('auth.getStatus()', function(newValue) {
      $scope.status = newValue;
    });
    
    
    Posts.query(function(response) {
      $scope.posts = response;
    });

    $scope.expand = function(post) {
      if (post.content === undefined) {
        Posts.get({'postId': post._id}, function(response) {
          post.content = response.content;
          $scope.readingId = post._id;
        });
      }
    };

    $scope.addPost = function() {
      var newPost = new Posts({
        title: $scope.form.title,
        excerpt: $scope.form.excerpt,
        content: $scope.form.content,
        completed: false
      });
      newPost.$save(function(post){
        $scope.posts.push(post);
        $scope.writeNew = false;
        $scope.form = {title: '', excerpt: '', content: ''};
      });
    };
    
    $scope.removePost = function(id) {
      Posts.delete({postId: id}, function(post){
        for(var i = $scope.posts.length - 1; i >= 0; i--) {
          if($scope.posts[i]._id === post._id) {
             $scope.posts.splice(i, 1);
          }
        }
      });
    };
    
  });
