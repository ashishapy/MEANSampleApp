angular.module('app').factory('authFactr', ['$http','$q', 'identityFactr',authFactr]);

function authFactr($http, $q, identityFactr) {
	return{
		authenticateUser: function (username, password) {
			var dfd = $q.defer();
			$http.post('/login', {username: username, password: password})
			.then(function (response) {
				if(response.data.success){
					identityFactr.currentUser = response.data.user;
					dfd.resolve(true);
				}else {
					identityFactr.currentUser = undefined;
					dfd.resolve(false);
				}
			});
			return dfd.promise;
		}
	}
}