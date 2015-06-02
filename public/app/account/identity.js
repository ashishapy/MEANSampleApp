
angular.module('app').factory('identityFactr', ['$window','userFactr', identityFactr])

function identityFactr($window, userFactr) {
	var currentUser;
	if(!!$window.bootstrappedUserObject){
		currentUser = new userFactr();
		angular.extend(currentUser, $window.bootstrappedUserObject);
	}
	return {
		currentUser: currentUser,
		isAuthenticated: function () {
			return !!this.currentUser;
		},
		isAuthorized: function (role) {
			return !!this.currentUser && this.currentUser.roles.indexOf('admin') > -1;
		}
	};
}