let stud = angular.module('studApp',[])
stud.controller('studCtrl',function($scope,$http){
    $scope.studData=[]
    $scope.newStud ={}
    $scope.message = ""
    $scope.viewStud = ()=>{
        $http.get('/api/getStud').then((response)=>{
            $scope.studData = response.data
        })
    }
    $scope.viewStud()

    // Function to Add stud
    $scope.addStud = (stud)=>{
        $http.post('/api/addStud',stud).then((response)=>{
            $scope.message = response.data.message  
            $scope.viewStud()
        })
    }

    // Function to Delete stud
    $scope.studDelete = (sID)=>{
        $http.delete(`/api/delete/${sID}`).then((response)=>{
            $scope.message = response.data.message
            $scope.viewStud()
        })
    }

    // Edit Data
    $scope.edit =(item)=>{
        $scope.isEdit=true
        $scope.newStud = item
    }
    $scope.studEdit = (item)=>{
        $http.put(`/api/studEdit/${item.sID}`,item).then((response)=>{
            $scope.message = response.data.message
            $scope.viewStud()
        })
    }
})