'use strict';
angular.module('users', []);

//Routers
myApp.config(function($stateProvider) {

     //Login
     $stateProvider.state('login', {
          url: "/login",
          templateUrl: 'partials/users/login.html',
          controller: 'loginController'
     });

     //Signup
     $stateProvider.state('signup', {
          url: "/signup",
          templateUrl: 'partials/users/signup.html',
          controller: 'signupController'
     });

     //Logout
     $stateProvider.state('logout', {
          url: "/logout",
          template: "<h3>Logging out...</h3>",
          controller: 'logoutController'
     });

});

//Factories
myApp.factory('userServices', ['$http', function($http) {

     var factoryDefinitions = {
          login: function(loginReq) {
               return $http.post('/login', loginReq).success(function(data) { return data; });
          },
          signup: function(signupReq) {
               return $http.post('/signup', signupReq).success(function(data) { return data; });
          }
     }

     return factoryDefinitions;
}
]);

//Controllers
myApp.controller('loginController', ['$scope', 'userServices', '$location', '$rootScope', function($scope, userServices, $location, $rootScope) {
     $scope.doLogin = function() {

          if ($scope.loginForm.$valid) {
               var loginInfo = {
                    email: $scope.login.email,
                    password: $scope.login.password
               }
               userServices.login(loginInfo).then(function(result){
                    $scope.data = result;
                    if (result.data.success===true) {
                         window.sessionStorage["userInfo"] = JSON.stringify(result.data);
                         $rootScope.userInfo = JSON.parse(window.sessionStorage["userInfo"]);
                         $location.path("/image");
                    }
               });
          }
     };
}]);

myApp.controller('signupController', ['$scope', 'userServices', '$location', function($scope, userServices, $location) {
     $scope.doSignup = function() {
          if ($scope.signupForm.$valid) {
               var signupInfo = {
                    firstName: $scope.signup.firstName,
                    lastName: $scope.signup.lastName,
                    email: $scope.signup.email,
                    password: $scope.signup.password
               }
               userServices.signup(signupInfo).then(function(result){
                    $scope.data = result;
                    if (!result.error) {
                         $location.path("/login");
                    }
               });
          }
     }
}]);

myApp.controller('logoutController', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {
     sessionStorage.clear();
     $rootScope.userInfo = false;
     $location.path("/login");
}]);
