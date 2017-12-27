define([
	'app',
    'helper/util',
    'text!html/aside.html',
    'text!html/admin.html',
    'controller/asideController'
], function (app, util, asideHtmlContent, adminHtmlContent, asideController) {
    app.registerController("adminController",['$scope', function ($scope) {
        $scope.asideHtmlContent = asideHtmlContent;

		$scope.asd = "asd";
	}]);

	return adminHtmlContent;
});