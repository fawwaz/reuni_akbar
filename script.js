var App = angular.module('App',['ui.router','restangular']);

App.config(function($stateProvider,$urlRouterProvider,RestangularProvider){
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home',{
			url:'/home',
			templateUrl:'page/home.html'
		})
		.state('daftar',{
			url:'/daftar',
			templateUrl:'page/daftar.html',
			controller:'daftarController'
		})
		.state('list',{
			url:'/list',
			templateUrl:'page/list.html',
			controller:'listController'
		}).state('terimakasih',{
			url:'/terimakasih',
			templateUrl:'page/terimakasih.html'
		}).state('kontak',{
			url:'/kontak',
			templateUrl:'page/kontak.html'
		});


	//  MAGIC happen here ....
	RestangularProvider.setBaseUrl('https://api.mlab.com/api/1/databases/alumni_albinaa/collections');
	RestangularProvider.setDefaultRequestParams({ apiKey: 'DIla8CSJm9TTaUtMionHl3UClP3x6XbC' });
	RestangularProvider.setRestangularFields({
		id: '_id.$oid'
	});

	RestangularProvider.setRequestInterceptor(function(elem, operation, what) {

		if (operation === 'put') {
			elem._id = undefined;
			return elem;
		}
		return elem;
	});


});

App.controller('daftarController',function($scope, $state, Restangular){
	$scope.message = "hai ";

	$scope.save = function(){
		Restangular.all('alumni').post($scope.alumni).then(function(alumni){
			$state.go('terimakasih');
		});
	}
});

App.controller('listController',function($scope,$state,Restangular){
	$scope.alumnus = Restangular.all('alumni').getList().$object;
	Restangular.all('alumni').getList().then(function(alumnus){
		$scope.alumnus = _.sortBy(alumnus,angkatan);
	});
});