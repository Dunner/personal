'use strict';

/**
 * @ngdoc service
 * @name lightApp.auth
 * @description
 * # auth
 * Factory in the lightApp.
 */
angular.module('lightApp')
  .factory('Auth', function Auth(Session) {
    var factory = [];
    
    factory.canEdit = false;

    factory.login = function(data, callback) {
      var cb = callback || angular.noop;
      Session.save({
        feed: data.feed,
        password: data.password,
        rememberMe: data.rememberMe
      }, function(success) {
        return cb(success);
      }, function(err) {
        return cb(err);
      });
    };

    factory.logout = function(callback) {
      var cb = callback || angular.noop;
      Session.delete(function() {
          return cb();
        },
        function(err) {
          return cb(err.data);
        });
    };
    
    return factory;
    
  });