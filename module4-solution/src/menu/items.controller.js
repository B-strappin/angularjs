(function() {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['MenuDataService','items'];
function ItemsController(MenuDataService,items) {
	var categorydata = this;

	categorydata.items = items;	
	
}

})();