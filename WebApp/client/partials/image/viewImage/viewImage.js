'use strict';

angular.module('viewImage', []);

//Routers
myApp.config(function($stateProvider) {
    $stateProvider.state('view_image', {
        url: '/view_image',
        templateUrl: 'partials/image/viewImage/viewImage.html',
        controller: 'viewImageCtrl'
    });

});

myApp.factory('viewImageService', ['$http', function($http) {
    var factoryDefinitions = {
        getImgLink: function() {
            return $http.get('/image/image/getImgLink').success(function(data) { return data; });
        },
    }
    return factoryDefinitions;
}
]);

myApp.controller('viewImageCtrl', [ '$scope','viewImageService', function($scope, viewImageService) {
     viewImageService.getImgLink().then(function(result){
          $scope.image = result.data.imgLink;
     });

}]);
