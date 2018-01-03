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