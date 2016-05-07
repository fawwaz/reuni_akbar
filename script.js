var App = angular.module('App',['ui.router']);

App.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/daftar');

	$stateProvider
		.state('daftar',{
			url:'/daftar',
			templateUrl:'page/daftar.html'
		})
		.state('list',{
			url:'/list',
			templateUrl:'page/list.html'
		}).state('terimakasih',{
			url:'/terimakasih',
			templateUrl:'page/terimakasih.html'
		});
});

App.controller('mainController',function($scope){
	$scope.message = "hai ";
});