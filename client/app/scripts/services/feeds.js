'use strict';


/**
 * @ngdoc service
 * @name lightApp.Feeds
 * @description
 * # Feeds
 * Service in the lightApp.
 */

angular.module('lightApp')
   .service('Feeds', function ($resource) {
      return $resource('api/feeds/:slug', {
         slug: '@slug'
      });
   });