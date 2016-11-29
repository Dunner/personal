'use strict';

/**
 * @ngdoc function
 * @name lightAppApp.controller:feedCtrl
 * @description
 * # feedCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('feedCtrl', function ($scope, $stateParams, Auth, Posts, Feeds, session) {
    
    $scope.writeNew = false;
    $scope.readingId = '';
    Auth.canEdit = false;

    Feeds.get({'slug': $stateParams.slug}).$promise.then(function(response) {
      $scope.feed = response;
      
      Posts.query({'feedId': $scope.feed._id}, function(response) {
        $scope.posts = response;
      });

      if (session.feedId == $scope.feed._id && typeof $scope.feed._id === 'string') {
        Auth.canEdit = true;
      }

    });


    $scope.expand = function(post) {
      if (post.content === undefined) {
        Posts.get({'feedId': $scope.feed._id, 'postId': post._id}, function(response) {
          post.content = response.content;
          $scope.readingId = post._id;
        });
      } else {
        $scope.readingId = post._id;
      }
    };

    $scope.addPost = function() {
      var newPost = new Posts({
        title: $scope.form.title,
        excerpt: $scope.form.excerpt,
        content: $scope.form.content,
        inFeed: $scope.feed._id,
        completed: false
      });
      newPost.$save({'feedId': $scope.feed._id}, function(post){
        $scope.posts.push(post);
        $scope.writeNew = false;
        $scope.form = {title: '', excerpt: '', content: ''};
      });
    };
    
    $scope.removePost = function(id) {
      Posts.delete({'feedId': $scope.feed._id, postId: id}, function(post){
        for(var i = $scope.posts.length - 1; i >= 0; i--) {
          if($scope.posts[i]._id === post._id) {
            $scope.posts.splice(i, 1);
          }
        }
      });
    };
    
  });
