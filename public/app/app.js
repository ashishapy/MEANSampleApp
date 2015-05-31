/// <reference path="../../typings/angularjs/angular.d.ts"/>
angular.module('app', ['ngResource', 'ui.router']);

angular.module('app').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
	
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
    });
}]);