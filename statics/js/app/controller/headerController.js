
define([
	'app',
    'helper/mdwiki',
    'helper/util',
	'text!html/header.html',
], function (app, mdwiki, util, htmlContent) {
    app.registerController("headerController",['$scope', function ($scope) {
		$scope.message = "this is header";
	}]);

	return htmlContent;
});
