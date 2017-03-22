'use strict';

angular.module('image', ['bootstrapLightbox']);

//Routers
myApp.config(function($stateProvider) {
     $stateProvider.state('image', {
          url: '/image',
          templateUrl: 'partials/image/image.html',
          data:{
               auth:true
          }
     });

});

//Factories
myApp.factory('imageServices', ['$http', function($http) {

     var factoryDefinitions = {
          getCustomersReports: function() {
               return $http.get('partials/image/mock/customers_reports.json').success(function(data) { return data; });
          },
          getOrdersReports: function() {
               return $http.get('partials/image/mock/orders_reports.json').success(function(data, status, headers, config) { return data; });
          }
     }

     return factoryDefinitions;
}
]);

//Controllers
myApp.controller('imageController', ['$scope','Lightbox', 'imageServices', function($scope,Lightbox, imageServices) {
     $scope.imgList = [
          {
               id: 1,
               url: "../../img/gallery/img_fjords.jpg",
               thumbUrl: "../../img/gallery/img_fjords.jpg"
          },
          {
               id: 2,
               url: "../../img/gallery/img_lights.jpg",
               thumbUrl: "../../img/gallery/img_lights.jpg"
          },
          {
               id: 3,
               url: "../../img/gallery/img_mountains.jpg",
               thumbUrl: "../../img/gallery/img_mountains.jpg"
          },
          {
               id: 4,
               url: "../../img/gallery/img_nature.jpg",
               thumbUrl: "../../img/gallery/img_nature.jpg"
          },
          {
               id: 5,
               url: "../../img/gallery/img_mountains.jpg",
               thumbUrl: "../../img/gallery/img_mountains.jpg"
          }
     ];
     // $scope.showModal = function(){
     //      $uibModal.open({
     //           templateUrl: 'myModal.html',
     //           controller: 'ModalDialogController',
     //           windowClass: 'modal'
     //      })
     //      .result.then(
     //           function () {
     //                alert("OK");
     //           },
     //           function () {
     //                alert("Cancel");
     //           }
     //      );
     // };
     $scope.openLightboxModal = function (index) {
          Lightbox.openModal($scope.imgList, index);
     };
}]);

// myApp.controller("MyCtrl", function($scope, $uibModal) {
//      $scope.showModal = function(){
//           $uibModal.open({
//                templateUrl: 'myModal.html',
//                controller: 'ModalDialogController',
//           })
//           .result.then(
//                function () {
//                     alert("OK");
//                },
//                function () {
//                     alert("Cancel");
//                }
//           );
//      }
// });
//
// myApp.controller("ModalDialogController", function ($scope, $uibModalInstance) {
//      $scope.ok = function () {
//           $uibModalInstance.close();
//      };
//
//      $scope.cancel = function () {
//           $uibModalInstance.dismiss('cancel');
//      };
// });
