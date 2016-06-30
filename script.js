var underscore = angular.module('underscore',[]);

underscore.factory('_',['$window',function($window){
	return $window._;
}]);

var App = angular.module('App',['ui.router','restangular','underscore']);

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
		}).state('question',{
			url:'/pertanyaan',
			templateUrl:'page/question.html'
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
	$scope.sending_to_server = false;

	$scope.save = function(){
		$scope.sending_to_server = true;
		Restangular.all('alumni').post($scope.alumni).then(function(alumni){
			$state.go('terimakasih');
			$scope.sending_to_server = false;
		});
	}
});

App.controller('listController',function($scope,$state,Restangular,_){
	$scope.alumnus = Restangular.all('alumni').getList().$object;
	Restangular.all('alumni').getList().then(function(alumnus){
		console.log(alumnus);
		$scope.alumnus = alumnus.sort(function(a,b){
			if(a.angkatan == b.angkatan){
				if(a.nama_lengkap.toLowerCase() < b.nama_lengkap.toLowerCase()){
					return -1;
				}else if(a.nama_lengkap.toLowerCase() > b.nama_lengkap.toLowerCase()){
					return 1;
				}else{
					return 0;
				}
			}else{
				if(a.angkatan < b.angkatan){
					return -1;
				}else{
					return 1;
				}
			}
		});
		//$scope.alumnus = _.sortBy(alumnus,angkatan);
	});
});