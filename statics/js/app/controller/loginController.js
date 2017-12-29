
define([
	'app',
	'text!html/login.html',
], function (app, htmlContent) {
	var util = app.objects.util;
	var config = app.objects.config;
    app.registerController("loginController",['$scope', '$auth', function ($scope, $auth) {
		//$scope.errMsg = "Warning, there is an error!";
		$scope.name = "";
		$scope.password = "";

		$scope.login = function(){	
			if($scope.name != "" && $scope.password != ""){
				var params = {
					name: $scope.name,
					password: $scope.password,
				};
				util.$http({
					method:"GET",
					url: config.apiUrlPrefix + "admin/login",
					params: params,
					success: function(data) {
						$auth.setToken(data.token);
						app.setUser(data.userinfo);
						//window.location.href = "/dashboard/admin";
						util.go("/dashboard/admin");
					},
					error: function(err) {
						$scope.errMsg = err.message;
					}
				});	
			}else{
				$scope.errMsg = "用户名和密码不能为空!";
			}
			
			
		}
	}]);

	return htmlContent;
});
