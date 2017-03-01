'use strict';

angular.module('uploadImage', []);

//Routers
myApp.config(function($stateProvider) {
     $stateProvider.state('upload_image', {
          url: '/upload_image',
          templateUrl: 'partials/image/uploadImage/uploadImage.html',
          controller: 'uploadImageCtrl'
     });

});

myApp.controller('uploadImageCtrl', [ '$scope', function($scope) {

}]);
