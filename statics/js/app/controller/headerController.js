
define([
	'app',
	'text!html/header.html',
], function (app, htmlContent) {
    app.registerController("headerController",['$scope', function ($scope) {
		$scope.message = "this is header";
		var $auth = app.ng_objects.$auth;
		var storage = app.objects.storage;
		var util = app.objects.util;
		var admin_info = storage.sessionStorageGetItem("admin_info");
		//var $rootScope = app.ng_objects.$rootScope;
		//console.log("111"+admin_info);
		$scope.admin_name = admin_info.name;
		$scope.isLogined = $auth.isAuthenticated();

		$scope.logout = function(){
			$auth.logout();
			$auth.removeToken();
			$scope.isLogined = $auth.isAuthenticated();
			util.go("/");
		}
	}]);

	return htmlContent;
});


