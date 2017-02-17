(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope', '$filter'];
function LunchCheckController($scope) {
	$scope.lunchItems = "";
  $scope.message = "";

  $scope.checkItems = function () {
  	var itemArray = $scope.lunchItems.split(' ').join('').split(",");
  	for (var i=0; i < itemArray.length; i++) {
  		if (itemArray[i] === "") {
  			itemArray.splice(i,1);
  			i--;
  		}
  	}
  
  	if ($scope.lunchItems == "") {
  		$scope.message = "Please enter data first"
  	} else if (itemArray.length <= 3) {
  		$scope.message = "Enjoy!";
  	} else {
  		$scope.message = "Too much!";
  	}
  };
  
}

})();
