'use strict';


/**
 * @ngdoc service
 * @name lightApp.Posts
 * @description
 * # Posts
 * Service in the lightApp.
 */

angular.module('lightApp')
   .service('Posts', function ($resource) {
      return $resource('api/posts/:feedId/:postId', {
         feedId: '@feedId',
         postId: '@postId'
      }, {
         
         update: {
            method: 'PUT'
         }
      });
   });