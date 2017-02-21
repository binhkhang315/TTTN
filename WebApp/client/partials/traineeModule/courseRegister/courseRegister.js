'use strict';

angular.module('trainee_courseRegister', ['ui.toggle']);

//Routers
myApp.config(function($stateProvider) {
    $stateProvider.state('trainee_courseRegister', {
        url: '/trainee_courseRegister',
        templateUrl: 'partials/traineeModule/courseRegister/courseRegister.html',
        data:{
            auth:true
        }
    });

});

myApp.factory('courseRegisterServices', ['$http', function($http) {
    var factoryDefinitions = {
        getTrainingProgram: function() {
            return $http.get('/trainee/courseRegister/getTrainingProgram').success(function(data) { return data; });
        },
        getOpeningClass: function() {
            return $http.get('/trainee/courseRegister/getOpeningClass').success(function(data) { return data; });
        },
        getMyEnrolledClass: function(request) {
            return $http.post('trainee/courseRegister/getMyEnrolledClass', request).success(function(data) { return data; });
        },
        sendRegisterRequest: function(request) {
            return $http.post('/trainee/courseRegister/sendRegisterRequest', request).success(function(data) { return data; });
        },
        getRequestedOpeningCourse: function(request) {
            return $http.post('/trainee/courseRegister/getRequestedOpeningCourse', request).success(function(data) { return data; });
        },
    }
    return factoryDefinitions;
}
]);


//Controllers
myApp.controller('courseRegisterCtrl', ['$sce','$rootScope', '$scope', 'courseRegisterServices', function($sce,$rootScope ,$scope, courseRegisterServices) {
    courseRegisterServices.getMyEnrolledClass({userEmail:$rootScope.userInfo.email}).then(function(result){
        var myEnrolledCourse = [];
        result.data.classRecord.forEach(classRecord => {
            var today = new Date();
            var startTime = new Date(classRecord.Class.startTime);
            if(today < startTime) myEnrolledCourse.push(classRecord.Class.Course);
        });
        $scope.myEnrolledCourse = myEnrolledCourse;
    }).then(function(){
        courseRegisterServices.getRequestedOpeningCourse({userId:$rootScope.userInfo.id}).then(function(result){
            $scope.requestedOpeningCourse = {};
            $scope.requestedOpeningCourse = result.data.requestedOpeningCourse;
        });
    }).then(function(){
        courseRegisterServices.getOpeningClass().then(function(result){
            $scope.openingCourseList = {};
            var tempOpeningCourseList = [];
            result.data.openingClass.forEach(openingClass => {
                tempOpeningCourseList.push(openingClass.Course);
            });
            $scope.openingCourseList = tempOpeningCourseList;
        });
    }).then(function(){
        courseRegisterServices.getTrainingProgram().then(function(result){
            $scope.trainingProgramList = {};
            var trainingProgram = {};
            trainingProgram = result.data.data;

            trainingProgram.forEach(trainingProgram => {
                trainingProgram.Courses.forEach(course => {
                    course.isOpening = false;
                    course.buttonName = "Register";
                    course.buttonColor = "#8BC34A";
                });
            });

            if(isEmpty($scope.openingCourseList)===false){
                $scope.openingCourseList.forEach(openingCourseListElement=>{
                    trainingProgram.forEach(trainingProgramElement =>{
                        trainingProgramElement.Courses.forEach(function(courseElement, courseElementIndex, Courses){
                            if(courseElement.id == openingCourseListElement.id) {
                                Courses[courseElementIndex].isOpening = true;
                                Courses[courseElementIndex].buttonName = "Register";
                                Courses[courseElementIndex].buttonColor = "#4FC3F7";
                            }
                        });
                    });
                });
            }
            //Splice course user enrolled in training program list
            if(isEmpty($scope.myEnrolledCourse)===false){
                for(var i=$scope.myEnrolledCourse.length-1; i>=0; i--){
                    for(var j=trainingProgram.length-1; j>=0; j--){
                        for(var k=trainingProgram[j].Courses.length-1; k>=0; k--){
                            if(trainingProgram[j].Courses[k].id == $scope.myEnrolledCourse[i].id){
                                trainingProgram[j].Courses.splice(k,1);
                            }
                        }
                    }
                }
            }

            //Splice course user requested in training program
            if(isEmpty($scope.requestedOpeningCourse)===false){
                for(var i=$scope.requestedOpeningCourse.length-1; i>=0; i--){
                    for(var j=trainingProgram.length-1; j>=0; j--){
                        for(var k=trainingProgram[j].Courses.length-1; k>=0; k--){
                            if(trainingProgram[j].Courses[k].id == $scope.requestedOpeningCourse[i].courseId){
                                trainingProgram[j].Courses.splice(k,1);
                            }
                        }
                    }
                }
            }
            $scope.trainingProgramList = trainingProgram;
        });
    });

    function isEmpty( o ) {
        for ( var p in o ) {
            if ( o.hasOwnProperty( p ) ) { return false; }
        }
        return true;
    }

    $scope.findCourse = function(courseSearchKey){
        var courseListSearchResult = []
        $scope.trainingProgramList.forEach(trainingProgram => {
            trainingProgram.Courses.forEach(course => {
                if(course.name.toUpperCase().indexOf(courseSearchKey.toUpperCase()) !== -1) courseListSearchResult.push(course);
            });
        });
        $scope.courseListSearchResult = courseListSearchResult;
    };

    $scope.highlight = function(text, search) {
        if (!search) {
            return $sce.trustAsHtml(text);
        }
        return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
    };


    $scope.filtCourse = function(){
        switch($scope.opt){
            case 'openingCourse': $scope.openingCourseFilter = 1;break;
            case 'allCourse': $scope.openingCourseFilter = 0;break;
            default: $scope.openingCourseFilter = 0;break;
        }
    }


    $scope.registerCourse = function(courseId){
        // courseRegisterStatus = true : unregister;
        // courseRegisterStatus = false : register;
        var request = {
            courseId : courseId,
            userId : $rootScope.userInfo.id
        };
        courseRegisterServices.sendRegisterRequest(request).then(
            function(result)
            {
                if (result.data.msg){
                    $rootScope.ShowPopupMessage(result.data.msg, "success");
                    for(var i=$scope.trainingProgramList.length-1; i>=0; i--){
                        for(var j=$scope.trainingProgramList[i].Courses.length-1; j>=0; j--){
                            if($scope.trainingProgramList[i].Courses[j].id==courseId) {
                                $scope.trainingProgramList[i].Courses.splice(j,1);
                            }
                        }
                    }
                }
                else
                $rootScope.ShowPopupMessage("Register Error", "error");
            }
        );

    };
}]);
