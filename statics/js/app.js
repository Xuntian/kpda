/**
 * Created by Administrator on 2017/11/26.
 */

define([
    'angular',
    'angular-ui-bootstrap',
    'satellizer',
], function (angular) {
	var app = {};
    app.appName = "keepwork";
	app.objects = {};
    app.ng_objects = {
        controller_map:{},
        directive_map:{},
        component_map:{},
    };

    // 定义angular app模块
    app.ng_app = angular.module(app.appName, ['ui.bootstrap', 'satellizer']).run(["$injector", function($injector) {
        app.angularBootstrap = true;
		app.ng_objects.$injector = $injector;
		app.ng_objects.$rootScope = $injector.get("$rootScope");
		app.ng_objects.$compile = $injector.get("$compile");
		app.ng_objects.$http = $injector.get("$http");
		app.ng_objects.$auth = $injector.get("$auth");
    }]);

	//ng_app = app.get("app.ng_app", ng_app);
    // angular配置

    app.ng_app.config([
			'$controllerProvider',
		   	'$compileProvider',
		   	'$locationProvider',
			'$authProvider',
		   	function (
				$controllerProvider, 
				$compileProvider, 
				$locationProvider, 
				$authProvider) {
				
				app.ng_objects.$controllerProvider = $controllerProvider;
				app.ng_objects.$compileProvider = $compileProvider;
				app.ng_objects.$locationProvider = $locationProvider;
				app.ng_objects.$authProvider = $authProvider;
    }]);

    // 提供动态注册控制器接口
    app.registerController = function (name, constructor) {
        if (app.ng_objects.controller_map[name]) {
            return;
        }
        if (app.angularBootstrap) {
            app.ng_objects.$controllerProvider.register(name, constructor);
        } else {
            app.ng_app.controller(name, constructor);
        }
        app.ng_objects.component_map[name] = constructor;
    };

    // 注册组件
    app.registerComponent = function (name, option) {
        if (app.ng_objects.component_map[name]) {
            return;
        }
        if (app.angularBootstrap) {
            app.ng_objects.$compileProvider.component(name, option);
        } else {
            app.ng_app.component(name, option);
        }
        app.ng_objects.component_map[name] = option;
    }

    // 注册控指令
    app.registerDirective = function(name, directiveFactory) {
        if (app.ng_objects.directive_map[name]) {
            return;
        }
        if (app.angularBootstrap) {
            app.ng_objects.$compileProvider.directive(name, directiveFactory);
        } else {
            app.ng_app.directive(name, directiveFactory);
        }
        app.ng_objects.directive_map[name] = directiveFactory;
    }

    // 判断控制器，指令，组件是否存在
    // app.has = function(typ, name) {
    //     return app.ng_objects[type][name];
    // }

    // 启动框架
    app.bootstrap = function () {
        require([
			"helper/storage",
			"helper/config",
			"helper/util",
			"helper/mdwiki",

			"directive/wikiPage",

			"controller/mainController",
			//'directive/treeview',
        ], function (storage, config, util, mdwiki) {
			app.objects.storage = storage;
			app.objects.config = config;
			app.objects.util = util;
			app.objects.mdwiki = mdwiki;

            angular.bootstrap(document, [app.appName]);
        });
    }

	// 获取用户信息
	// app.getUser = function(success, error) {
	// 	var $auth = app.ng_objects.$auth;
	// 	var storage = app.objects.storage;
	// 	var util = app.objects.util;
	// 	var config = app.objects.config;
	// 	if (!$auth.isAuthenticated()) {
	// 		error && error();
	// 		return;
	// 	}
	// 	var authUseinfo = $auth.getPayload();
	// 	var userinfo = app.objects.user || storage.sessionStorageGetItem("userinfo");
	// 	if (userinfo && authUseinfo && userinfo.name == authUseinfo.name) {
	// 		success && success(userinfo);
	// 		return;
	// 	}
		
	// 	util.$http({
	// 		url: config.apiUrlPrefix + "user", 
	// 		method: "GET",
	// 		success: function(data) {
	// 			if (data) {
	// 				success && success(data);	
	// 				app.setUser(data);
	// 			}
	// 		},
	// 		error: error,
	// 	});

	// 	return userinfo;
	// }
	app.getAdmin = function(success, error) {
		var $auth = app.ng_objects.$auth;
		var storage = app.objects.storage;
		var util = app.objects.util;
		var config = app.objects.config;
		if (!$auth.isAuthenticated()) {
			error && error();
			return;
		}
		var authAdminInfo = $auth.getPayload();
		var admin_info = app.objects.admin || storage.sessionStorageGetItem("admin_info");
		if (admin_info && authAdminInfo && admin_info.name == authAdminInfo.name) {
			success && success(admin_info);
			return;
		}
		console.log(admin_info);
		console.log(authAdminInfo);
		util.$http({
			url: config.apiUrlPrefix + "admin/get", 
			method: "GET",
			params: {name: authAdminInfo.name},
			success: function(data) {
				if (data) {
					success && success(data);	
					app.setAdmin(data);
				}
			},
			error: error,
		});

		return admin_info;
	}
	// 设置用户信息
	// app.setUser = function(userinfo) {
	// 	var $rootScope = app.ng_objects.$rootScope;
	// 	var storage = app.objects.storage;
	// 	app.objects.user = $rootScope.user = userinfo;
	// 	$rootScope.$broadcast("userinfo", userinfo);
	// 	storage.sessionStorageSetItem("userinfo", userinfo);	
	// }
	app.setAdmin = function(admin_info) {
		var $rootScope = app.ng_objects.$rootScope;
		var storage = app.objects.storage;
		app.objects.admin = $rootScope.admin = admin_info;
		$rootScope.$broadcast("admin_info", admin_info);
		storage.sessionStorageSetItem("admin_info", admin_info);	
	}

    window.app = app;
    return app;
});

// define([
//     'angular',
//     'angular-ui-bootstrap',
//     'satellizer',
// ], function (angular) {
// 	window._G = window._G || {};

//     function get(key, obj) {
//         var g = window._G;
//         if (!key) {
//             return g;
//         }

//         var ks = key.split(".");
//         var length = ks.length;
//         for (var i = 0; i < length - 1; i++) {
//             g[ks[i]] = g[ks[i]] || {};
//             g = g[ks[i]];
//         }
//         g = g[ks[length-1]] = obj || {};
//         return g;
//     }

// 	var app = get("app");
// 	app.get = get;
//     app.appName = "keepwork";
//     app.ng_objects = {
//         controller_map:{},
//         directive_map:{},
//         component_map:{},
//     };

//     // 定义angular app模块
//     app.ng_app = angular.module(app.appName, ['ui.bootstrap', 'satellizer']).run(["$injector", function($injector) {
//         app.angularBootstrap = true;
// 		app.ng_objects.$injector = $injector;
// 		app.ng_objects.$rootScope = $injector.get("$rootScope");
// 		app.ng_objects.$compile = $injector.get("$compile");
// 		app.ng_objects.$http = $injector.get("$http");
//     }]);

// 	//ng_app = app.get("app.ng_app", ng_app);
//     // angular配置

//     app.ng_app.config([
// 			'$controllerProvider',
// 		   	'$compileProvider',
// 		   	'$locationProvider',
// 			'$authProvider',
// 		   	function (
// 				$controllerProvider, 
// 				$compileProvider, 
// 				$locationProvider, 
// 				$authProvider) {
				
// 				app.ng_objects.$controllerProvider = $controllerProvider;
// 				app.ng_objects.$compileProvider = $compileProvider;
// 				app.ng_objects.$locationProvider = $locationProvider;
// 				app.ng_objects.$authProvider = $authProvider;
//     }]);

//     // 提供动态注册控制器接口
//     app.registerController = function (name, constructor) {
//         if (app.ng_objects.controller_map[name]) {
//             return;
//         }
//         if (app.angularBootstrap) {
//             app.ng_objects.$controllerProvider.register(name, constructor);
//         } else {
//             app.ng_app.controller(name, constructor);
//         }
//         app.ng_objects.component_map[name] = constructor;
//     };

//     // 注册组件
//     app.registerComponent = function (name, option) {
//         if (app.ng_objects.component_map[name]) {
//             return;
//         }
//         if (app.angularBootstrap) {
//             app.ng_objects.$compileProvider.component(name, option);
//         } else {
//             app.ng_app.component(name, option);
//         }
//         app.ng_objects.component_map[name] = option;
//     }

//     // 注册控指令
//     app.registerDirective = function(name, directiveFactory) {
//         if (app.ng_objects.directive_map[name]) {
//             return;
//         }
//         if (app.angularBootstrap) {
//             app.ng_objects.$compileProvider.directive(name, directiveFactory);
//         } else {
//             app.ng_app.directive(name, directiveFactory);
//         }
//         app.ng_objects.directive_map[name] = directiveFactory;
//     }

//     // 判断控制器，指令，组件是否存在
//     // app.has = function(typ, name) {
//     //     return app.ng_objects[type][name];
//     // }

//     // 启动框架
//     app.bootstrap = function () {
//         require([
// 			"helper/storage",
// 			"directive/wikiPage",
//         ], function (storage) {
// 			app.get("app.helper.storage", storage);

//             angular.bootstrap(document, [app.appName]);
//         });
//     }




//     window.app = app;
//     return app;
// });
