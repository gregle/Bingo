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
      .when('/:seed?', {
        templateUrl: 'views/main.html',
        controller: 'BingoCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/#'
      });
  });
