(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['RegistrationService'];
function MyInfoController(RegistrationService) {
  var $ctrl = this;

  $ctrl.user = RegistrationService.getuser();
}

})();