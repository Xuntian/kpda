
define([
	'app',
    'helper/mdwiki',
    'helper/util',
	'text!html/footer.html',
], function (app, mdwiki, util, htmlContent) {
    app.registerController("footerController",['$scope', function ($scope) {
		$scope.message = "this is footer";
	}]);

	return htmlContent;
});
