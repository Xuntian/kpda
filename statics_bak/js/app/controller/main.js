
define([
	'app',
	'controller/header',
], function (app, headerContent) {
	app.registerController("mainController",['$scope', function ($scope) {
		var util = app.objects.util;
		var config = app.objects.config;
		var mdwiki = app.objects.mdwiki;
		var $rootScope = app.ng_objects.$rootScope;
		$rootScope.isShowHeader = true;
		$rootScope.isShowFooter = true;
		$rootScope.headerContent = headerContent;
		$rootScope.imgsPath = "/assets/imgs/";
		

		function init(){
			util.replaceState({url:util.getAbsoluteUrl()});
		}

		app.getUser(function(userinfo){
			$rootScope.user = userinfo;
			init();
		}, function(){
			init();
		});
		//var urlObj = util.parseUrl();
		//console.log(urlObj);
		//util.replaceState()
		//if (!urlObj.username || urlObj.username == "www") {
			//var controllerName = "controller/" + (urlObj.sitename || "test") + "Controller";
			//require([
				//controllerName,
			//], function(htmlContent){
				//$scope.content = htmlContent;
				//$scope.$apply();
			//});
		//}
	}]);
});
