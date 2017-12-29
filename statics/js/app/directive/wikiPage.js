

define([
	"app",
], function(app) {
	app.registerDirective("wikipage", ["$compile", function($compile){
		var util = app.objects.util;
		var config = app.objects.config;
		var mdwiki = app.objects.mdwiki;
		return {
			restrict:"E",
			scope: true, 
			//template:'<input ng-model="message"><div>{{message}}</div>',
			controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs){
				var content, contentUrl;
				var $rootScope = app.ng_objects.$rootScope;
				var $auth = app.ng_objects.$auth;
				$scope.imgsPath = $rootScope.imgsPath;

				function render() {
					if (content) {
						$element.html($compile(content)($scope));
						return;
					}

					if (!contentUrl) {
						return;
					}

					if ($auth.isAuthenticated()) {
						var urlobj = util.parseUrl(contentUrl);
						if (!urlobj.username || urlobj.username == "dashboard") {
							var ctrlPath = "controller/" + (urlobj.sitename || "admin") + "Controller";
							//console.log(ctrlPath);
							require([  
								ctrlPath,
							], function(content) {
								//console.log(content);
								$element.html($compile(content)($scope));
								$scope.$apply();
							});
						}
					} else {
						var ctrlPath = "controller/loginController";
						require([  
							ctrlPath,
						], function(content) {
							//console.log(content);
							$element.html($compile(content)($scope));
							$scope.$apply();
						});
					}
					//console.log(urlobj);
					// if (!urlobj.username || urlobj.username == "dashboard") {
					// 	var ctrlPath = "controller/" + (urlobj.sitename || "login") + "Controller";
					// 	//console.log(ctrlPath);
					// 	require([  
					// 		ctrlPath,
					// 	], function(content) {
					// 		//console.log(content);
					// 		$element.html($compile(content)($scope));
					// 		$scope.$apply();
					// 	});
					// } else {
					// 	var url = urlobj.url;
					// 	util.$http({
					// 		url:config.apiUrlPrefix + 'page/get_content_by_path',
					// 		method:"GET",
					// 		params: {
					// 			path: url.substring(1) + ".md",
					// 		},
					// 		success:function(data) {
					// 			if (!data) {
					// 				return;
					// 			}
					// 			var md = mdwiki();
					// 			var htmlstr = md.render(data);
					// 			$element.html($compile(htmlstr)($scope));
					// 			util.$apply($scope);
					// 		},
					// 		error: function() {

					// 		}
					// 	})
					// }
				}

				$scope.$watch($attrs.content, function(newVal) {
					if (!newVal || newVal == content) {
						return;
					}
					content = newVal;
					render();
				});
				$scope.$watch($attrs.contentUrl, function(newVal) {
					if (!newVal || newVal == contentUrl) {
						return;
					}
					contentUrl = newVal;
					render();
				});
			}],
		}
	}]);
});


// define([
// 	"app",
// ], function(app) {
// 	app.registerDirective("wikiPage", ["$compile", function($compile){
// 		return {
// 			restrict:"E",
// 			scope: true,
// 			//template:'<input ng-model="message"><div>{{message}}</div>',
// 			controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs){
// 				var content, contentUrl;

// 				function render() {
// 					$element.html($compile(content)($scope));
// 				}

// 				$scope.$watch($attrs.content, function(newVal) {
// 					if (!newVal || newVal == content) {
// 						return;
// 					}
// 					content = newVal;
// 					render();
// 				});
// 				$scope.$watch($attrs.contentUrl, function(newVal) {
// 					if (!newVal || newVal == contentUrl) {
// 						return;
// 					}
// 					contentUrl = newVal;
// 					render();
// 				});
// 			}],
// 		}
// 	}]);
// });
