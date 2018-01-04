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

        $scope.disable = function(id, currentStatus){
            var operation = (currentStatus == 1) ? "禁用" : "启用";
            var confirm = window.confirm("确定" + operation + "id为" + id + "的管理员账户吗？");
            var status = -currentStatus;
            if(confirm){
                util.$http({
                    method:"GET",
                    url: config.apiUrlPrefix + "admin/disable",
                    params: {
                        id: id,
                        status: status
                    },
                    success: function(data) {
                        console.log(data);
                        $scope.list();
                    },
                    error: function(err) {
                        
                    }
                });	
            }
        }

        $scope.remove = function(id){
            var confirm = window.confirm("确定删除id为" + id + "的管理员账户吗？");
            if(confirm){
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
            }
        }
	}]);

	return adminHtmlContent;
});