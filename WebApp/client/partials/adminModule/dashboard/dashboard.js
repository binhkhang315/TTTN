'use strict';

angular.module('admin_dashboard', []);

//Routers
myApp.config(function($stateProvider) {
    $stateProvider.state('admin_dashboard', {
        url: '/admin_dashboard',
        templateUrl: 'partials/adminModule/dashboard/dashboard.html',
        data:{
            auth:true
        },
    });
});

//factory
myApp.factory('adminDashboardServices', ['$http', function($http) {
    var factoryDefinitions={
        getAdminRequestOpenCourse: function(){
            return $http.get('/admin/dashboard/getAdminRequestOpenCourse').success(function(data) { return data; });
        }
    }
    return factoryDefinitions;
}]);

//Controllers
myApp.controller('adminDashboardCtrl', ['$scope', 'adminDashboardServices','$rootScope', '$state', function($scope, adminDashboardServices, $rootScope, $state) {
    adminDashboardServices.getAdminRequestOpenCourse().then(function(result){
        $scope.adminRequestOpenCourseList = result.data.data;
    });
}]);
