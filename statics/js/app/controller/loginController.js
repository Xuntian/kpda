
define([
	'app',
    'helper/util',
	'text!html/login.html',
	'text!html/test.html',
], function (app, util, htmlContent, testHtmlContent) {
    app.registerController("loginController",['$scope', function ($scope) {
		$scope.errMsg = "Warning, there is an error!";
		$scope.login = function(){
			//alert("asds");
			//$scope.content = testHtmlContent;
			window.location.href = "/dashboard/admin";
		}
	}]);

	return htmlContent;
});
