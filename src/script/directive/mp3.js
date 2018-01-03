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