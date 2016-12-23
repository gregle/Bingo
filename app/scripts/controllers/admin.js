'use strict';
function AdminCtrl($http) 
{
	var vm = this;
	$http.get('assets/phrases.json')
		.then(function(res){
			vm.bingoInfo = res.data;
			vm.purePhraseList = JSON.parse(JSON.stringify(vm.bingoInfo.phrases));
			vm.loadGrid();
		});
	vm.title = 'bingo';
	vm.grid = []; 
	vm.seed = Math.random().toString(36).substr(2, 5);

	vm.ShufflePhrases = function(){
		vm.resetPhrases();
		//Seed the random function
		Math.seedrandom(vm.seed.toLowerCase());
		var i = vm.bingoInfo.phrases.length, j, temp;
		while(--i > 0){
		    j = Math.floor(Math.random() * (i+1)); // Get random number ranging between 0 and i
		    temp = vm.bingoInfo.phrases[j];
		    vm.bingoInfo.phrases[j] = vm.bingoInfo.phrases[i];
		    vm.bingoInfo.phrases[i] = temp;
		}
	};
	vm.loadGrid = function(){
		vm.ShufflePhrases();
		vm.grid = [];
		var k = 0;
		var length = vm.bingoInfo.phrases.length / 5;
		for (var i = 0; i < length ; i++){
			vm.grid.push([{phrase: 'test', hit: false}, {phrase: 'test', hit: false}, {phrase: 'test', hit: false}, {phrase: 'test', hit: false}, {phrase: 'test', hit: false}]);
			for (var j = 0; j <vm.grid[i].length; j++)
			{
				vm.grid[i][j].phrase = vm.bingoInfo.phrases[k];
				vm.grid[i][j].hit = false;
				k++;
			}
		}
	};

	vm.selectTile = function(tile){
		if(tile.phrase !== vm.bingoInfo.freeSpace){
			tile.hit = !tile.hit;
		}
	};

	vm.reset = function() {
		vm.loadGrid();
	};

	vm.setRandomSeed = function(){
		Math.seedrandom();
		vm.seed = Math.random().toString(36).substr(2, 5);
		vm.loadGrid();
	};

	vm.setSeed = function(){
		vm.loadGrid();
	};

	vm.resetPhrases = function(){
		vm.bingoInfo.phrases = [];
		vm.bingoInfo.phrases= JSON.parse(JSON.stringify(vm.purePhraseList));
	};
}

/**
 * @ngdoc function
 * @name bingoApp.controller:BingoCtrl
 * @description
 * # BingoCtrl
 * Controller of the bingoApp
 */
angular.module('bingoApp')
  .controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['$http'];
