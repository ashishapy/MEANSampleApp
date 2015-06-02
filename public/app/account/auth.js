angular.module('app').factory('authFactr', ['$http','$q', 'identityFactr','userFactr',authFactr]);

function authFactr($http, $q, identityFactr, userFactr) {
	return{
		
		authenticateUser: function (username, password) {
			var dfd = $q.defer();
			$http.post('/login', {username: username, password: password})
			.then(function (response) {
				if(response.data.success){
					var user = new userFactr();
					angular.extend(user, response.data.user)
					identityFactr.currentUser = user;
					dfd.resolve(true);
				}else {
					identityFactr.currentUser = undefined;
					dfd.resolve(false);
				}
			});
			return dfd.promise;
		},
		
		logoutUser: function () {
			var dfd = $q.defer();
			$http.post('/logout', {logout: true}).then(function () {
				identityFactr.currentUser = undefined;
				dfd.resolve();
			});
			return dfd.promise;
		},
		
		authorizeCurrentUserForRoute: function (role) {
			if(identityFactr.isAuthorized(role)) {
      	return true;
			}else{
      	console.log('not authorized');
        return $q.reject('not authorized');
      }
		}
	};
}