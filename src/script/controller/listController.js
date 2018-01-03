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