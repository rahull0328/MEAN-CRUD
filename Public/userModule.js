let user = angular.module('userApp', []);
user.controller('userController', function($scope, $http){
    $scope.userData = [];
    $scope.newData = {};
    $scope.message = "";

})