'use strict';

/**
 * @ngdoc function
 * @name bingoApp.controller:BingoCtrl
 * @description
 * # BingoCtrl
 * Controller of the bingoApp
 */
angular.module('bingoApp')
  .controller('BingoCtrl', function () {
  	var vm = this;
  	vm.title = 'bingo';
  	vm.confetti = false;
  	vm.grid = [
  		[{phrase: 'test', hit: false}, {phrase: 'test', hit: false}, {phrase: 'test', hit: false}, {phrase: 'test', hit: false}, {phrase: 'test', hit: false}],
  		[{phrase: 'test', hit: false}, {phrase: 'test', hit: false}, {phrase: 'test', hit: false}, {phrase: 'test', hit: false}, {phrase: 'test', hit: false}],
  		[{phrase: 'test', hit: false}, {phrase: 'test', hit: false}, {phrase: 'test', hit: false}, {phrase: 'test', hit: false}, {phrase: 'test', hit: false}],
  		[{phrase: 'test', hit: false}, {phrase: 'test', hit: false}, {phrase: 'test', hit: false}, {phrase: 'test', hit: false}, {phrase: 'test', hit: false}],
  		[{phrase: 'test', hit: false}, {phrase: 'test', hit: false}, {phrase: 'test', hit: false}, {phrase: 'test', hit: false}, {phrase: 'test', hit: false}]
  		];

  	vm.init = function(){

  	};

  	vm.selectTile = function(tile){
  		tile.hit = !tile.hit;
  	};

  	vm.celebration = function() {
		//document.getElementById('audiotag1').play();
		vm.confetti = true;
		StartConfetti(); // jshint ignore:line
	};

	vm.reset = function() {
		vm.confetti = false;
	};

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
