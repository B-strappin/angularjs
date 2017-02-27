(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController)
.directive('favoriteCheck', FavoriteCheck);

SignUpController.$inject = ['MenuService', 'RegistrationService'];
function SignUpController(MenuService, RegistrationService) {
  var $ctrl = this;

  $ctrl.submit = function () {
  	var promise = MenuService.checkItemExists($ctrl.user.favorite);
  	promise.then(function(response) {
  		$ctrl.error = false;
  		RegistrationService.setuser($ctrl.user);
  		$ctrl.successMessage = "Your information has been saved.";
  	}, function (error) {
  		$ctrl.error = true;
  		$ctrl.favoriteError = "No such menu number exists.";
  	});
  };

  $ctrl.checkItem = function () {
  	var promise = MenuService.checkItemExists($ctrl.user.favorite);
  	promise.then(function(response) {
  		$ctrl.error = false;
  	}, function (error) {
  		$ctrl.error = true;
  		$ctrl.favoriteError = "No such menu number exists.";
  	});
  }
}

FavoriteCheck.$inject = ['MenuService', '$q'];
function FavoriteCheck(MenuService, $q) {
	return {
		require: 'ngModel',
		link: function(scope,element,attr,ctrl) {

      ctrl.$asyncValidators.favoriteCheck = function(modelValue, viewValue) {
      	var def = $q.defer();
      	var promise = MenuService.checkItemExists(modelValue);
      	promise.then(function(response){
      		def.resolve();
      	}, function(response) {
      		def.reject();
      	});
      	return def.promise;
      };
		}
	};
}

})();