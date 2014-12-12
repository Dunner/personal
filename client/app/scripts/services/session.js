'use strict';

/**
 * @ngdoc service
 * @name lightApp.session
 * @description
 * # session
 * Service in the lightApp.
 */
angular.module('lightApp')
  .service('Session', function ($resource) {
    return $resource('/api/session/');
  });

