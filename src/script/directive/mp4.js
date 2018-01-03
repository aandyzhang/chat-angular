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
