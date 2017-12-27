
define([
	'app',
    'helper/mdwiki',
    'helper/util',
	'text!html/aside.html',
], function (app, mdwiki, util, htmlContent) {
    app.registerController("asideController",['$scope', function ($scope) {
		$scope.message = "this is aside panel";

		$scope.showGivenView = function(viewName){
			window.location.href = "/dashboard/" + viewName;
		}
	}]);

	return htmlContent;
});
