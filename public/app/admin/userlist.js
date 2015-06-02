angular.module('app').controller('userListCtrl', ['userFactr',userListCtrl]);

function userListCtrl(userFactr) {
	var vm = this;
	
	vm.users = userFactr.query();
}