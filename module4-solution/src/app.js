(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService, $scope) {
  var buyList = this;
	buyList.buyItems = ShoppingListCheckOffService.getBuyItems();
  buyList.removeBuyItem = function (itemIndex,itemName,itemQuantity) {
    ShoppingListCheckOffService.removeBuyItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;
  boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;
  var buyItems = [{name: "cookies", quantity: 10},
                  {name: "chips", quantity: 5},
                  {name: "icecream", quantity: 3},
                  {name: "hotdogs", quantity: 6},
                  {name: "buns", quantity: 6}];
  var boughtItems = [];

  service.removeBuyItem = function(itemIndex) {
    var item = buyItems[itemIndex];
    service.addBoughtItem(item.name,item.quantity);
    buyItems.splice(itemIndex, 1);
  }
  service.addBoughtItem = function (itemName, itemQuantity) {
    var item = {name: itemName, quantity: itemQuantity};
    boughtItems.push(item);
  }
  service.getBuyItems = function() {
    return buyItems;
  }
  service.getBoughtItems = function() {
    return boughtItems;
  }
}

})();
