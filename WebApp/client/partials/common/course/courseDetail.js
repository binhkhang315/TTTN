'use strict';
angular.module('courseDetail', []);

myApp.config(function($stateProvider) {
    $stateProvider.state('courseDetail', {
        url:"/courseDetail",
        templateUrl: 'partials/common/course/courseDetail.html',
        controller: 'courseDetailCtrl',
        params: {
            courseId: null,
        },
        data:{
            auth:true
        }
    });
});


//Factories
myApp.factory('courseDetailServices', ['$http', function($http) {

    var factoryDefinitions = {
        getCourseDetailById: function(courseId) {
            return $http.post('/common/course/getCourseDetail', {courseId : courseId}).success(function(data) { return data; });
        },
        // sendFeedback: function(req) {
        //     return $http.post('/course/giveFeedback', req).success(function(data) { return data; });
        // },
        getClassByCourseID: function(courseId){
            return $http.post('/common/course/getClassByCourseID', {courseId : courseId}).success(function(data) { return data; });
        },
        addClass: function(Class){
            return $http.post('/admin/courses/addClass', Class).success(function(data){return data;});
        },
        updateClass: function(Class){
            return $http.post('/admin/courses/updateClass', Class).success(function(data){return data;});
        },
        deleteClass: function(Class){
            return $http.post('/admin/courses/deleteClass', Class).success(function(data){return data;});
        }
    }

    return factoryDefinitions;
}
]);

//Controllers
myApp.controller('courseDetailCtrl', ['$scope', '$rootScope', '$stateParams', 'courseDetailServices', function($scope, $rootScope, $stateParams, courseDetailServices) {
    //getCourseDetail
    $scope.courseDetail = {};
    courseDetailServices.getCourseDetailById($stateParams.courseId).then(function(result){
        $scope.courseDetail = result.data.data;
    });

    $scope.classList = {};
    courseDetailServices.getClassByCourseID($stateParams.courseId).then(function(result){
        $scope.classList = result.data.data;
    });

    //
    // $scope.giveFeedback = function(){
    //     var req = {
    //         email: $rootScope.userInfo.email,
    //         courseId: $scope.courseDetail.id,
    //         rating: $scope.rate
    //     };
    //     courseDetailServices.sendFeedback(req).then(function(result){
    //         if(result.data.success){
    //             $rootScope.popUpMessage("Rating success", "success");
    //         }else{
    //             $rootScope.popUpMessage("Rating fail", "error");
    //         }
    //     });
    // }

    //Rating
    $scope.rate = 1;
    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
    };
    //Class
    $scope.showAddClassForm=function(){
        $rootScope.addEditFormIsEditForm =  false;
        //Class
        $rootScope.addEditClassFormTitle = 'Add Class';
        $rootScope.addEditClassFormAction = 'Add';
        //date and time

        $rootScope.timeOfStart =  new Date();
        $rootScope.timeOfStart.setHours (9);
        $rootScope.timeOfStart.setMinutes (0);
        $rootScope.dayOfStart =  new Date();

        $rootScope.adminClassModel = {
            dayOfStart: $rootScope.dayOfStart ,
            timeOfStart: $rootScope.timeOfStart,
            courseId:   $stateParams.courseId,
            location: '',
            //TODO
            // trainerId: '',
            startTime: $rootScope.dateTimePicker,
            duration: '',
            maxAttendant: '',
            note: '',
        };

    };
    $scope.showUpdateClassForm = function(Class){
        $rootScope.addEditFormIsEditForm =  true;
        $rootScope.addEditClassFormTitle = 'Edit Class';
        $rootScope.addEditClassFormAction = 'Update Class';

        Class.startTime = new Date(Class.startTime);
        $rootScope.dayOfStart = Class.startTime;
        $rootScope.timeOfStart =  new Date();
        $rootScope.timeOfStart.setHours (Class.startTime.getHours());
        $rootScope.timeOfStart.setMinutes (Class.startTime.getMinutes());

        $rootScope.adminClassModel = {
            dayOfStart: $rootScope.dayOfStart  ,
            timeOfStart: $rootScope.timeOfStart,
            id: Class.id,
            location: Class.location ,
            // startTime: $rootScope.dayOfStart,
            duration: Class.duration,
            maxAttendant: Class.maxAttendant,
            note: Class.note,
            courseId:{
                id: Class.courseId
            }
        };
    };
    $scope.showDeleteClassForm = function(Class){
        $rootScope.deleteClass = Class.location + ' class';
        $rootScope.adminClassModel = {
            id: Class.id
        };
    };
}]);


myApp.controller('addEditClassCtrl', [ '$scope', '$rootScope','courseDetailServices','$stateParams', function($scope, $rootScope, courseDetailServices, $location, $stateParams) {

    //Class
    $scope.addEditClassClick = function(){

        if ($rootScope.addEditFormIsEditForm){
            $rootScope.dateTimePicker = $rootScope.adminClassModel.dayOfStart;
            $rootScope.dateTimePicker.setHours ($rootScope.adminClassModel.timeOfStart.getHours());
            $rootScope.dateTimePicker.setMinutes ($rootScope.adminClassModel.timeOfStart.getMinutes());
            $rootScope.adminClassModel.startTime = $rootScope.dateTimePicker;

            //edit class
            courseDetailServices.updateClass($rootScope.adminClassModel).then(function(result){
                if (result.data.success){
                    //Get Class List
                    courseDetailServices.getClassByCourseID($rootScope.adminClassModel.courseId).then(function(result){
                        $scope.classList = result.data.data;
                    });
                    $rootScope.ShowPopupMessage(result.data.msg, "success");
                    $location.path("#courseDetail");
                }else{
                    $rootScope.ShowPopupMessage('Edit Class FAIL!',"error");
                }
            });
        }
        else {
            //add Class
            $rootScope.dateTimePicker = $rootScope.adminClassModel.dayOfStart;
            $rootScope.dateTimePicker.setHours ($rootScope.adminClassModel.timeOfStart.getHours());
            $rootScope.dateTimePicker.setMinutes ($rootScope.adminClassModel.timeOfStart.getMinutes());
            $rootScope.adminClassModel.startTime = $rootScope.dateTimePicker;

            courseDetailServices.addClass($rootScope.adminClassModel).then(function(result) {
                if (result.data.success){
                    //Get Class List
                    courseDetailServices.getClassByCourseID($rootScope.adminClassModel.courseId).then(function(result){
                        $scope.classList = result.data.data;
                    });
                    // $location.path("/userProfile");
                    $rootScope.ShowPopupMessage(result.data.msg, "success");
                } else {
                    $rootScope.ShowPopupMessage('Add Class Info FAIL!', "error");
                }
            });
        }
    };
}]);

myApp.controller('DateTimepickerCtrl', function ($scope,$rootScope, $log) {
    //time picker

  $scope.hstep = 1;
  $scope.mstep = 5;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = false;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  //DatePicker
  $rootScope.dayOfStart = '';
  $scope.today = function() {
      $rootScope.dayOfStart = new Date();
  };

  $scope.clear = function() {
      $rootScope.dayOfStart = null;
  };

  $scope.inlineOptions = {
      minDate: new Date(),
      showWeeks: true
  };

  $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
  };

  $scope.open1 = function() {
      $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
      $scope.popup2.opened = true;
  };


  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[1];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
      opened: false
  };

  $scope.popup2 = {
      opened: false
  };

});
