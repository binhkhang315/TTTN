'use strict';

angular.module('home', ['calendarModule']);

//Routers
myApp.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'partials/home/home.html',
        controller: 'homeCtrl'
    });

});

myApp.controller('homeCtrl', [ '$scope', function($scope) {
    $scope.templates =
        { name: 'template3.html', url: 'partials/calendarModule/calendar.html'};
  }]);
