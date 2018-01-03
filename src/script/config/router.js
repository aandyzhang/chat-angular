'use strict';

angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider.state('chat',{
        url:'/chat',
        templateUrl:'view/chat.html',
        controller:'chatCtrl'
    });
    $urlRouterProvider.otherwise('chat'); //如果前边的都匹配不到，则转发大main页面
}])