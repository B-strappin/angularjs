(function () {
'use strict';

angular.module('data')
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http','ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
	var data = this;

	data.getAllCategories = function () {
		var response = $http({
			method: "GET",
      url: (ApiBasePath + "/categories.json")
		});
		
		return response;
	}

	data.getItemsForCategory = function(categoryShortName) {
		var response = $http({
			method: "GET",
			url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
		});
		return response;
	}

}

})();