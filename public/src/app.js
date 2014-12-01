
angular.module('EventMgrApp',['ngRoute','ngResource','ngMessages'])
     .config(function($routeProvider, $locationProvider){
     	$routeProvider
     	.when('/',{
                    controller:'ShellController',
                    templateUrl:'views/ShellView.html'

          })
          .when('/CreateEvent',{
     			controller:'EventController',
     			templateUrl:'views/CreateEventView.html'

     	})
          .when('/ViewEvent',{
                    controller:'EventController',
                    templateUrl:'views/ViewEventView.html'

          });
     	$locationProvider.html5Mode(true); 
     });
