
angular.module('app').factory('identityFactr', function () {
	return {
		currentUser: undefined,
		isAuthenticated: function () {
			return !!this.currentUser;
		}
	};
});