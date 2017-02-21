'use strict';
angular.module('calendarModule', ['ui.calendar', 'ui.bootstrap']);

//Routers
myApp.config(function($stateProvider) {

    //calendar
    $stateProvider.state('calendar', {
        templateUrl: 'partials/calendarModule/calendar.html',
        controller: 'calendarController'
    });
});

//Factories
myApp.factory('calendarServices', ['$http', function($http) {

    var factoryDefinitions = {
        getEvents: function() {
            return $http.get('/getEvents').success(function(res) { return res; });
        },

    }

    return factoryDefinitions;
}]);

//Controllers
myApp.controller('calendarController', ['$scope', 'calendarServices', '$location', '$rootScope', function($scope, calendarServices, $compile, $timeout, uiCalendarConfig) {

    /* config object */
    $scope.uiConfig = {
        calendar:{
            editable: false, //Not allow to edit events
            header:{
                left: 'month basicWeek basicDay agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            eventClick: $scope.alertEventOnClick,
        }
    };

    /* event source that contains custom events on the scope */
    $scope.events = [];
    /* event sources array*/
    $scope.eventSources = [$scope.events]; // Calendar may have many sources

    calendarServices.getEvents().then(function(result){
        result.data.eventList.forEach(function(event){
            $scope.events.push({
                title: event.summary,
                description: event.description,
                start: event.start.dateTime,
                end: event.end.dateTime,
                location: event.location,
                stick: true,
            });
        });
    });
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };

    /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
        'tooltip-append-to-body': true});
        $compile(element)($scope);
    };

}]);
