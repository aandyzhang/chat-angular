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