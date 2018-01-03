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
