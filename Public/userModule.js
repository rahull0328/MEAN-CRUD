let user = angular.module('userApp', []);
user.controller('userController', function($scope, $http){
    $scope.userData = [];
    $scope.newData = {};
    $scope.message = "";

    $scope.getUser = function () {
        $http.get('/api/getUsers/').then((response)=>{
            $scope.userData = response.data
        })
    }
    $scope.getUser()
})