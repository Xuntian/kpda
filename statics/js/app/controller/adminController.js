define([
	'app',
    'text!html/aside.html',
    'text!html/admin.html',
    'controller/asideController'
], function (app, asideHtmlContent, adminHtmlContent, asideController) {
    app.registerController("adminController",['$scope', function ($scope) {
        $scope.asideHtmlContent = asideHtmlContent;
        $scope.asd = "asd";
        var config = app.objects.config;
        var util = app.objects.util;
        util.$http({
            method:"GET",
            url: config.apiUrlPrefix + "admin/list",
            success: function(data) {
                console.log(data);
                $scope.admin_list = data.admin_list;
            },
            error: function(err) {
                
            }
        });	
	}]);

	return adminHtmlContent;
});