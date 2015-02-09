'use strict';

/**
 * @ngdoc overview
 * @name lightAppApp
 * @description
 * # lightAppApp
 *
 * Main module of the application.
 */
angular
  .module('lightApp', [
    'ui.router',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'textAngular',

    'btford.socket-io'
  ])
  .run(   ['$rootScope', '$state', '$window',
  function ($rootScope,   $state,   $window) {
  
    //Statechange
    $rootScope.$on('$stateChangeStart', function () {
      $window.scrollTo(0, 0);
    });
    $rootScope.$on('$stateChangeSuccess', function () {
      $window.scrollTo(0, 0);
      $rootScope.state = $state.current.name;
    });
    $rootScope.$on('$stateChangeError', function () {
      console.log('STATE CHANGE ERROR');
    });
    
  }])
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider',
  function ($locationProvider,   $stateProvider,   $urlRouterProvider,   $httpProvider) {
    // State Configurations //
    $httpProvider.defaults.withCredentials = true;

    $stateProvider
    
      .state('start', {
        url: '/',
        templateUrl: 'views/start.html',
        controller: 'startCtrl'
      })
      
      .state('feed', {
        url: '/{slug}',
        templateUrl: 'views/feed.html',
        controller: 'feedCtrl'
      });
      
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
  }]);