'use strict';

/**
 * @ngdoc service
 * @name lightApp.helper
 * @description
 * # helper
 * Factory in the lightApp.
 */
angular.module('lightApp')
  .factory('Helper', function Helper() {
    var factory = [],
        message = {};
    
    factory.get = function() {
      return message;
    };
    
    factory.set = function(value) {
      if (typeof value === 'object'){
        message = value;
      }
    };
    
    return factory;
    
  });