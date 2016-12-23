'use strict';
var globalConfetti = false;
function BingoCtrl($http, $routeParams) 
{
	var vm = this;
	$http.get('assets/phrases.json')
		.then(function(res){
			vm.bingoInfo = res.data;
			vm.loadGrid();
		});

	vm.title = 'bingo';
	vm.confetti = false;
	vm.grid = [
		[{phrase: 'loading', hit: false}, {phrase: 'loading', hit: false}, {phrase: 'loading', hit: false}, {phrase: 'loading', hit: false}, {phrase: 'loading', hit: false}],
		[{phrase: 'loading', hit: false}, {phrase: 'loading', hit: false}, {phrase: 'loading', hit: false}, {phrase: 'loading', hit: false}, {phrase: 'loading', hit: false}],
		[{phrase: 'loading', hit: false}, {phrase: 'loading', hit: false}, {phrase: 'loading', hit: false}, {phrase: 'loading', hit: false}, {phrase: 'loading', hit: false}],
		[{phrase: 'loading', hit: false}, {phrase: 'loading', hit: false}, {phrase: 'loading', hit: false}, {phrase: 'loading', hit: false}, {phrase: 'loading', hit: false}],
		[{phrase: 'loading', hit: false}, {phrase: 'loading', hit: false}, {phrase: 'loading', hit: false}, {phrase: 'loading', hit: false}, {phrase: 'loading', hit: false}]
		];

	vm.ShufflePhrases = function(){
		//Seed the random function
		if($routeParams.seed){
			Math.seedrandom($routeParams.seed.toLowerCase());
		}
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
		var k = 0;
		for (var i = 0; i < vm.grid.length; i++){
			for (var j = 0; j <vm.grid[i].length; j++)
			{
				if (i === 2 && j === 2){
					vm.grid[i][j].phrase = vm.bingoInfo.freeSpace;
					vm.grid[i][j].hit = true;
				}
				else {
					vm.grid[i][j].phrase = vm.bingoInfo.phrases[k];
					vm.grid[i][j].hit = false;
				}
				k++;
			}
		}
	};

	vm.selectTile = function(tile){
		if(tile.phrase !== vm.bingoInfo.freeSpace){
			tile.hit = !tile.hit;
		}
		if(vm.checkWin()){
			vm.celebration();
		}
	};

	vm.checkWin = function(){
		// Check Diagonals
		if (vm.grid[0][0].hit && 
			vm.grid[1][1].hit && 
			vm.grid[2][2].hit && 
			vm.grid[3][3].hit && 
			vm.grid[4][4].hit){
			return true;
		}

		if (vm.grid[0][4].hit && 
			vm.grid[1][3].hit && 
			vm.grid[2][2].hit && 
			vm.grid[3][1].hit && 
			vm.grid[4][0].hit){
			return true;
		}

		for (var i = 0; i < vm.grid.length; i++) {
			// Check Rows
			if (vm.grid[i][0].hit && 
				vm.grid[i][1].hit && 
				vm.grid[i][2].hit && 
				vm.grid[i][3].hit && 
				vm.grid[i][4].hit){
				return true;
			}
			// Check Columns
			if (vm.grid[0][i].hit && 
				vm.grid[1][i].hit && 
				vm.grid[2][i].hit && 
				vm.grid[3][i].hit && 
				vm.grid[4][i].hit){
				return true;
			}
		}

		return false;
	};

	vm.celebration = function() {
		document.getElementById('audiotag1').play();
		vm.confetti = true;
		globalConfetti = true;
		StartConfetti(); // jshint ignore:line
	};

	vm.reset = function() {
		vm.confetti = false;
		globalConfetti = false;
		for (var i = 0; i < vm.grid.length; i++){
			for (var j = 0; j <vm.grid[i].length; j++)
			{
				if (i === 2 && j === 2){
					vm.grid[i][j].phrase = vm.bingoInfo.freeSpace;
					vm.grid[i][j].hit = true;
				}
				else{
					vm.grid[i][j].hit=false;
				}
			}
		}
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
  .controller('BingoCtrl', BingoCtrl);

  BingoCtrl.$inject = ['$http', '$routeParams'];
