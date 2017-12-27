define([
	'app',
    'helper/util',
    'text!html/aside.html',
    'text!html/demo.html',
    'controller/asideController'
], function (app, util, asideHtmlContent, demoHtmlContent, asideController) {
    app.registerController("demoController",['$scope', function ($scope) {
        $scope.asideHtmlContent = asideHtmlContent;

		$scope.asd = "asd";
	}]);

	return demoHtmlContent;
});