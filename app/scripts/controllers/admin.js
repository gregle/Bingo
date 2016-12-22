'use strict';
function AdminCtrl($http) 
{
	$http.get('assets/phrases.json')
		.then(function(res){
			vm.bingoInfo = res.data;
			vm.loadGrid();
		});
	var vm = this;
	vm.title = 'bingo';
	vm.grid = []; 
	vm.loadGrid = function(){
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
