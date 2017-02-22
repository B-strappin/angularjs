(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems);

function FoundItems () {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'items',
    bindToController: true
  }
  return ddo;
}

FoundItemsDirectiveController.$inject = ['$scope'];
function FoundItemsDirectiveController($scope) {
  var items = this;
  $scope.isArray = angular.isArray;
  $scope.isString = angular.isString;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var items = this;

  items.menuItems = function () {
    var promise = MenuSearchService.getMatchedMenuItems(items.searchTerm);
    promise.then(function (response) {
      if (response.length > 0) {
        items.found = response;
      } else {
        items.found = "Nothing Found.";
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  };
  items.removeItem = function (itemIndex) {
    items.found.splice(itemIndex,1);
  }
}

MenuSearchService.$inject = ['$http','ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
    .then(function(result){
      var foundItems = [];
      var allItems = result.data.menu_items;
      for (var i = 0; i < allItems.length; i++) {
        var description = allItems[i].description;
        if (description.toLowerCase().indexOf(searchTerm) !== -1  && searchTerm !== "") {
          foundItems.push(allItems[i]);
        }
      }
      return foundItems;
    });
    return response;
  }
}

})();
