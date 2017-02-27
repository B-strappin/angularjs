(function () {
"use strict";

angular.module('common')
.service('RegistrationService', RegistrationService);

RegistrationService.$inject = ['ApiPath'];
function RegistrationService(ApiPath) {
	var reguser = this;

	reguser.setuser = function(user) {
		reguser.firstname = user.firstname;
		reguser.lastname = user.lastname;
		reguser.email = user.email;
		reguser.phone = user.phone;
		reguser.favorite = user.favorite;
		reguser.favoriteImageUrl = ApiPath + '/images/' + user.favorite + '.jpg';
		console.log(reguser);
	}

	reguser.getuser = function() {
		return reguser;
	}
}

})();