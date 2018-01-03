'use strict';

angular.module('app',['ui.router']);

'use strict';

angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider.state('chat',{
        url:'/chat',
        templateUrl:'view/chat.html',
        controller:'chatCtrl'
    });
    $urlRouterProvider.otherwise('chat'); //如果前边的都匹配不到，则转发大main页面
}])
"use strict";
angular.module("app")
    .controller("audioCtrl",['$scope',function($scope){
        // console.log($scope);
    }]);
"use strict";
angular.module("app").
controller("chatCtrl", ["$scope", "$http", "Data", function ($scope, $http, Data) {
	$scope.data = {};         //后台传来的数据
	$scope.error = false;    //默认不填信息发送为false
	$scope.load = true;		//默认开启加载页
	$scope.msg = ""; 		//输入框信息
	$scope.options = [];    //参数数组
	$scope.info    = [];     
	var promise = Data.data();
	promise.then(function (data) {
		if (data.errcode == 0 || data.errcode == '0') {
			$scope.data = data.data;
			$scope.load = false;
			$scope.data.list.map(function (value, key) {
				var content = JSON.parse(value.content);
				//自定义数据字段
				var opt = {
					"fromFans" : value.fromFans,
					"msgType"  : value.msgType,
					"content"  : content,
				};
				$scope.options.push(opt);
			});
		}
	}, function (data) {
		$scope.load = true;
	});
	// 发送消息信息
	$scope.push = function () {
		if ($scope.msg.length <= 0) {
			$scope.error = true;
		} else {
			$scope.info.push($scope.msg);
			$scope.msg = "";
			$scope.error = false;
		}
	};
	$scope.close = function () {
		$scope.msg = "";
	};
}]);
"use strict";
angular.module("app")
    .controller("fileController",['$scope',function($scope){
        console.log($scope.options);
    }]);
"use strict";
angular.module("app")
    .controller("listController",['$scope',function($scope){
        $scope.imageStatus = false;
        $scope.setBig = function(){
            $scope.imageStatus = true;
        };
        $scope.close = function(){
            $scope.imageStatus = false;
        };
    }]);
"use strict";
angular.module("app")
	.directive("file",function(){
		return {
			restrict: "AE",
			replace :true,
			templateUrl:"view/template/file.html",
			scope:{
				"options" :"=",
			},
			controller:"fileController",
		}
	});

"use strict";
angular.module("app")
	.directive("list",function(){
		return {
			restrict: "AE",
			replace :true,
			templateUrl:"view/template/list.html",
			scope:{
				"option" :"=",
			},
			controller:"listController",
		}
	});

"use strict";
angular.module("app")
	.directive("mp3",function($sce,$timeout){
		return {
			restrict: "AE",
			controller:"audioCtrl",
			templateUrl:"view/template/mp3.html",
			scope:{
				options :"=",
			},
			link :function($scope,ele){
				$scope.getUrl = function(url){
					return $sce.trustAsResourceUrl(url);
				};
				var audio = ele.find("audio")[0];
				$scope.status = audio.paused;
				$scope.play = function(){
					if($scope.status){
						audio.play();
						$scope.status = false;
					}else{
						audio.pause();
						$scope.status = true;
					}
				};
				$(audio).on('ended',function(){
					$timeout(function(){
						$scope.status = true;
					});
				});
			}

		}
	});
"use strict";
angular.module("app")
	.directive("mp4",["$sce","$timeout",function($sce,$timeout){
		return {
			restrict: "AE",
			replace :true,
			templateUrl:"view/template/mp4.html",
			scope:{
				"options" :"=",
			},
			link:function($scope,ele){
				$scope.getUrl = function(url){
					return $sce .trustAsResourceUrl(url);
				};
				var video = ele.find("video")[0];
				$scope.status = video.paused;
				$scope.play =function(){
					if($scope.status){
						video.play();
						$scope.status = false;
					}else{
						video.pause();
						$scope.status = true;
					}	
				};
				$(video).on('ended',function(){
					$timeout(function(){
						$scope.status = true;
					});
				});
			}
		}
	}]);

"use strict"
angular.module("app")
	.factory("Data",["$http","$q",function($http,$q){
		var url ="https://easy-mock.com/mock/5a3c66030df23b51b3614915/angular-less/kefu/msg/list#!method=post";	
		return {
			data : function(){
				var def = $q.defer();
				$http.post(url).success(function(data){
					def.resolve(data);
				}).error(function(data){
					def.reject(data);
				});
				return def.promise;
			}
		}
	}]);	
"use strict";
angular.module("app")
    .filter("getSize", function () {
        return function (bytes) {
            if (bytes === 0) return '0 B';
            var k = 1024;

            var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

            var i = Math.floor(Math.log(bytes) / Math.log(k));
            var result = (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
            return result;
        }
    })