angular.module('app').controller('navBarLoginCtrl', ['$scope','$http','notifierFactr','identityFactr','authFactr', navBarLoginCtrl]);

function navBarLoginCtrl ($scope, $http, notifierFactr, identityFactr, authFactr) {
	var vm = this;
	vm.isAuthenticated = identityFactr;

	vm.signin = function () {
		authFactr.authenticateUser(vm.username, vm.password).then(function (success) {
			if (success) {
				notifierFactr.notify('You have successfully signed in!')
			}else {
				notifierFactr.notify('Username & Password conbination incorrect.')
			}
		});
	};
};