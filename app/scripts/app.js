'use strict';

/**
 * @ngdoc overview
 * @name streamingoApp
 * @description
 * # streamingoApp
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
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'BingoCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
