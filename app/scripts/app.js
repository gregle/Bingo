'use strict';

/**
 * @ngdoc overview
 * @name bingoApp
 * @description
 * # bingoApp
 *
 * Main module of the application.
 */
angular
  .module('bingoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin',{
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        controllerAs: 'main'
      })
      .when('/:seed?', {
        templateUrl: 'views/main.html',
        controller: 'BingoCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/#'
      });
  });
