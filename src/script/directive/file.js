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
