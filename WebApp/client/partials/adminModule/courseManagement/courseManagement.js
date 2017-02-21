'use strict';

angular.module('admin_courseManagement', ['textAngular']);

//Routers
myApp.config(function($stateProvider) {
    $stateProvider.state('admin_courseManagement', {
        url: '/admin_courseManagement',
        templateUrl: 'partials/adminModule/courseManagement/courseManagement.html',
        data:{
            auth:true
        },
    });
});

//Factory
myApp.factory('courseManagementServices', ['$http', function($http) {

    var factoryDefinitions = {
        getCourseTypeList: function(){
            return $http.get('/admin/courses/getCourseTypeList').success(function(data) { return data; });
        },
        //Course
        addCourse: function(course){
            return $http.post('/admin/courses/addCourse',  course).success(function(data) { return data; });
        },
        updateCourse: function(course){
            return $http.post('/admin/courses/updateCourse', course).success(function(data) { return data; });
        },
        deleteCourse: function(courseId){
            return $http.post('/admin/courses/deleteCourse', courseId).success(function(data) { return data; });
        },
        //Training Program
        getTrainingProgramList: function() {
            return $http.get('/admin/courses/getTrainingProgramList').success(function(data) { return data; });
        },
        addTrainingProgram: function(trainingProgram){
            return $http.post('/admin/courses/addTrainingProgram', trainingProgram).success(function(data){return data;});
        },
        updateTrainingProgram: function(trainingProgram){
            return $http.post('/admin/courses/updateTrainingProgram', trainingProgram).success(function(data){return data;});
        },
        deleteTrainingProgram: function(trainingProgram){
            return $http.post('/admin/courses/deleteTrainingProgram', trainingProgram).success(function(data){return data;});
        },
        //Class
        getClass: function(courseId){
            return $http.post('/admin/courses/getClass', courseId).success(function(data) { return data; });
        },
        addClass: function(Class){
            return $http.post('/admin/courses/addClass', Class).success(function(data){return data;});
        },
        updateClass: function(Class){
            return $http.post('/admin/courses/updateTrainingProgram', Class).success(function(data){return data;});
        },
        deleteClass: function(Class){
            return $http.post('/admin/courses/deleteClass', Class).success(function(data){return data;});
        }
    }

    return factoryDefinitions;
}
]);

//controller
myApp.controller('courseManagementCtrl', [ '$scope', '$rootScope','courseManagementServices', function($scope, $rootScope, courseManagementServices, $location) {
    //GetTrainingProgram
    courseManagementServices.getTrainingProgramList().then(function(result) {
        result.data.trainingProgram.forEach(traningProgram => {
            traningProgram.Courses.forEach(course => {
                course.Classes.forEach(adminclass => {
                });
            });
        });

        $rootScope.adminTrainingProgramList = result.data.trainingProgram;
    });

    //dislay modal of edit & add course, trainning program or class

    $scope.showAddCourseForm=function(trainingProgram){
        $rootScope.addEditFormIsEditForm =  false;
        //course
        $rootScope.addEditCourseFormTitle = 'Add Course';
        $rootScope.addEditCourseFormAction = 'Add';
        $rootScope.courseModel = {
            name: '',
            description: '',
            duration:'',
            documents: '',
            test: '',
            trainingProgramId: trainingProgram.id

        };
    };
    $scope.showAddTPForm=function(){
        $rootScope.addEditFormIsEditForm =  false;
        // trainingProgram
        $rootScope.addEditTPFormTitle = 'Add Training Program';
        $rootScope.addEditTPFormAction = 'Add';
        $rootScope.adminTrainingProgramModel = {
            name: '',
            description: '',
            courseTypeId:{
                id: ''
            }
        };
    };

    $scope.showUpdateCourseForm = function(trainingProgram, course){
        $rootScope.addEditFormIsEditForm =  true;
        //course
        $rootScope.addEditCourseFormTitle = 'Edit Course';
        $rootScope.addEditCourseFormAction = 'Update';
        // console.log( course); //debug
        $rootScope.courseModel = {
            id: course.id,
            name: course.name,
            description: course.description,
            duration: course.duration,
            documents: course.documents,
            test: course.test,
            //TODO
            // trainerId: adminclass.trainerId,
            trainingProgramId: trainingProgram.id
        };
        // console.log($rootScope.courseModel);//debug
    };
    $scope.showUpdateTPForm = function(trainingProgram){
        $rootScope.addEditFormIsEditForm =  true;
        //trainingProgram
        $rootScope.addEditTPFormTitle = 'Edit Training Program';
        $rootScope.addEditTPFormAction = 'Update Training Program';
        $rootScope.adminTrainingProgramModel = {
            id: trainingProgram.id,
            name: trainingProgram.name,
            description: trainingProgram.description,
            courseTypeId:{
                id: trainingProgram.CourseType
            }
        };
    };
    $scope.showDeleteCourseForm = function(course){
        $rootScope.deleteClickId = 1;
        //course
        $rootScope.deleteName = course.name + 'course';
        $rootScope.courseModel = {
            id: course.id,
        };
    };
    $scope.showDeleteTPForm = function(trainingProgram){
        $rootScope.deleteClickId = 2;
        //training Program
        $rootScope.deleteName = trainingProgram.name + 'training program';
        $rootScope.adminTrainingProgramModel = {
            id: trainingProgram.id,
        };
    };
    $scope.showAddClassForm=function(course){
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
            courseId: course.courseId,
            location: '',
            //TODO
            // trainerId: '',
            // startTime: $rootScope.dt,
            duration: '',
            maxAttendant: '',
            note: ''
        };
    };
}]);

//Add and Edit Course Control
myApp.controller('addEditCourseCtrl', [ '$scope', '$rootScope','courseManagementServices', function($scope, $rootScope, courseManagementServices, $location) {
    //get TrainingProgram
    courseManagementServices.getTrainingProgramList().then(function(result){
        $rootScope.adminTrainingProgramList = result.data.trainingProgram;
    });

    $scope.addEditCourseClick = function(){
        if ($rootScope.addEditFormIsEditForm){
            //edit course
            courseManagementServices.updateCourse($rootScope.courseModel).then(function(result){
                if (result.data.success){
                    //GetTrainingProgram
                    courseManagementServices.getTrainingProgramList().then(function(result) {
                        $rootScope.adminTrainingProgramList = result.data.trainingProgram;
                    });
                    $rootScope.ShowPopupMessage(result.data.msg, "success");
                    // $location.path("#admin_courseManagement");
                }else{
                    $rootScope.ShowPopupMessage(result.data.msg, "error");
                }
            });
        }
        else {
            //add course
            courseManagementServices.addCourse($rootScope.courseModel).then(function(result) {
                if (result.data.success){
                    //GetTrainingProgram
                    courseManagementServices.getTrainingProgramList().then(function(result) {
                        $rootScope.adminTrainingProgramList = result.data.trainingProgram;
                    });
                    // $location.path("/userProfile");
                    $rootScope.ShowPopupMessage(result.data.msg, "success");
                } else {
                    $rootScope.ShowPopupMessage(result.data.msg, "error");
                }
            });
        }
    };
}]);

//Add and Edit Training Program Control
myApp.controller('addEditTPCtrl', [ '$scope', '$rootScope','courseManagementServices', function($scope, $rootScope, courseManagementServices, $location) {

    //getCourseTypeList
    courseManagementServices.getCourseTypeList().then(function(result){
        $scope.courseTypeList = result.data.courseType;
    });

    $scope.addEditTPClick = function(){
        if ($rootScope.addEditFormIsEditForm){
            //edit trainning program
            courseManagementServices.updateTrainingProgram($rootScope.adminTrainingProgramModel).then(function(result){
                if (result.data.success){
                    //GetTrainingProgram
                    courseManagementServices.getTrainingProgramList().then(function(result) {
                        $rootScope.adminTrainingProgramList = result.data.trainingProgram;
                    });
                    $rootScope.ShowPopupMessage(result.data.msg, "success");
                    // $location.path("#admin_courseManagement");
                }else{
                    $rootScope.ShowPopupMessage('Edit Training Program FAIL!',"error");
                }
            });
        }
        else {
            //add trainning program
            courseManagementServices.addTrainingProgram($rootScope.adminTrainingProgramModel).then(function(result) {
                if (result.data.success){
                    //GetTrainingProgram
                    courseManagementServices.getTrainingProgramList().then(function(result) {
                        $rootScope.adminTrainingProgramList = result.data.trainingProgram;
                    });
                    // $location.path("/userProfile");
                    $rootScope.ShowPopupMessage(result.data.msg, "success");
                } else {
                    $rootScope.ShowPopupMessage('Add Training Program FAIL!', "error");
                }
            });
        }
    };
}]);

//deletel Course, Class, Training program
myApp.controller('deleteCtrl', [ '$scope', '$rootScope','courseManagementServices', function($scope, $rootScope, courseManagementServices, $location) {

    $scope.deleteClick = function() {
        if( $rootScope.deleteClickId == 1 ){
            //delete course
            courseManagementServices.deleteCourse($rootScope.courseModel).then(function(result){
                if (result.data.success){
                    //get TrainingProgram
                    courseManagementServices.getTrainingProgramList().then(function(result){
                        $rootScope.adminTrainingProgramList = result.data.trainingProgram;
                    });
                    $rootScope.ShowPopupMessage(result.data.msg, "success");
                } else {
                    $rootScope.ShowPopupMessage(result.data.msg, "error");
                }
            });
        }else if ( $rootScope.deleteClickId == 2 ){
            //delete TP
            courseManagementServices.deleteTrainingProgram($rootScope.adminTrainingProgramModel).then(function(result){
                if (result.data.success){
                    //get TrainingProgram
                    courseManagementServices.getTrainingProgramList().then(function(result){
                        $rootScope.adminTrainingProgramList = result.data.trainingProgram;
                    });
                    $rootScope.ShowPopupMessage(result.data.msg, "success");
                } else {
                    $rootScope.ShowPopupMessage(result.data.msg, "error");
                }
            });
        }else if ( $rootScope.deleteClickId == 3 ){
            //delete Class
            courseManagementServices.deleteClass($rootScope.adminClassModel).then(function(result){
                if (result.data.success){
                    //get TrainingProgram
                    courseManagementServices.getTrainingProgramList().then(function(result){
                        $rootScope.adminTrainingProgramList = result.data.trainingProgram;
                    });
                    $rootScope.ShowPopupMessage(result.data.msg, "success");
                } else {
                    $rootScope.ShowPopupMessage(result.data.msg, "error");
                }
            });
        }

    };
}]);
