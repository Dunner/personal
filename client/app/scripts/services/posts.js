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
      return $resource('api/posts/:postId', {
         postId: '@_id'
      }, {
         
         update: {
            method: 'PUT'
         }
      });
   });