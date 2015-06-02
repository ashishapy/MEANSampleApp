/// <reference path="../../typings/angularjs/angular.d.ts"/>
angular.module('app', ['ngResource', 'ui.router']);

angular.module('app').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', appConfig]);


function appConfig ($stateProvider, $urlRouterProvider, $locationProvider) {
  
  var routeRoleChecks = {
    admin: {auth: function (authFactr) {
      return authFactr.authorizeCurrentUserForRoute('admin');
    }}
  };
	
  $locationProvider.html5Mode(true);
  
	// For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "/partials/main/main",
      controller: "mainCtrl as main"
    })
    .state('admin', {
      url: "/admin",
      abstract: true,
      template: '<ui-view/>'
    })
    .state('admin.users', {
      url: "/users",
      templateUrl: "/partials/admin/user-list",
      controller: "userListCtrl as userList",
      resolve: routeRoleChecks.admin
    });
};

angular.module('app').run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    if(error === 'not authorized'){
      $state.go('home');
    }
  });
});