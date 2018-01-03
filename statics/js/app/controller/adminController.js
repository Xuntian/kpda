define([
	'app',
    'text!html/aside.html',
    'text!html/admin.html',
    'controller/asideController'
], function (app, asideHtmlContent, adminHtmlContent, asideController) {
    app.registerController("adminController", ['$scope', function ($scope) {
        $scope.asideHtmlContent = asideHtmlContent;
        $scope.asd = "asd";
        var config = app.objects.config;
        var util = app.objects.util;
        $scope.searchByName = "";

        $scope.list = function(){
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
        }
        $scope.list();

        $scope.search = function(){
            console.log($scope.searchByName);
            if($scope.searchByName != ""){
                util.$http({
                    method:"GET",
                    url: config.apiUrlPrefix + "admin/search",
                    params: {
                        name: $scope.searchByName
                    },
                    success: function(data) {
                        console.log(data);
                        $scope.admin_list = data.admin_list;
                    },
                    error: function(err) {
                        
                    }
                });	
            }else{
                $scope.list();
            }
        }

        $scope.add = function(){

        }

        $scope.modify = function(){
            alert("search------------");
        }

        $scope.disable = function(id, status){
            alert("search------------");
        }

        $scope.remove = function(id){
            alert("search------------");
        }
	}]);

	return adminHtmlContent;
});