angular.module('app').controller('navBarLoginCtrl', ['$scope','$http','notifierFactr','identityFactr','authFactr','$location', navBarLoginCtrl]);

function navBarLoginCtrl ($scope, $http, notifierFactr, identityFactr, authFactr, $location) {
	var vm = this;
	vm.identity = identityFactr;
	
	vm.signin = function () {
		authFactr.authenticateUser(vm.username, vm.password).then(function (success) {
			if (success) {
				notifierFactr.notify('You have successfully signed in!');
			}else {
				notifierFactr.notify('Username & Password conbination incorrect.');
			}
		});
	};
	
	vm.signout = function () {
		authFactr.logoutUser().then(function(){
			vm.username = "",
			vm.password = "",
			notifierFactr.notify('You have successfully signed out!');
			$location.path('/');
		});
	};
};