
define([
	'app',
	'controller/headerController',
], function (app, headerContent) {
    app.registerController("mainController",['$scope', function ($scope) {

		var util = app.objects.util;
		var config = app.objects.config;
		var mdwiki = app.objects.mdwiki;
		var $rootScope = app.ng_objects.$rootScope;
		// $rootScope.isShowHeader = true;
		// $rootScope.isShowFooter = true;
		$rootScope.headerContent = headerContent;		
		//$rootScope.contentUrl = static/js/app/controller/loginController;
		function init(){
			util.replaceState({url:util.getAbsoluteUrl()});
			//util.replaceState({url:"dashboard/loginController"});
		}

		app.getAdmin(function(admin_info){
			$rootScope.admin = admin_info;
			init();
		}, function(){
			init();
		});

		// var urlObj = util.parseUrl();
		// console.log(urlObj);

		// var headerControllerName = "controller/" + "header" + "Controller";
		// require([
		// 	headerControllerName,
		// ], function(htmlContent){
		// 	$scope.headerContent = htmlContent;
		// 	$scope.$apply();
		// });

		// if (!urlObj.username || urlObj.username == "dashboard") {
		// 	var controllerName = "controller/" + (urlObj.sitename || "login") + "Controller";
		// 	require([
		// 		controllerName,
		// 	], function(htmlContent){
		// 		$scope.content = htmlContent;
		// 		$scope.$apply();
		// 	});
		// }
		
		// var footerControllerName = "controller/" + "footer" + "Controller";
		// require([
		// 	footerControllerName,
		// ], function(htmlContent){
		// 	$scope.footerContent = htmlContent;
		// 	$scope.$apply();
		// });
		
	}]);
}); 
