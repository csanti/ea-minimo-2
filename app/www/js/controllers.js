angular.module('app.controllers', [])

  .controller('SubjectsCtrl', function($scope, $stateParams, $http, $ionicModal) {

    console.log("SubjectsCtrl");
    $scope.sortBy = "name";


    /*
    $scope.subjects = [
      {name: 'IOT', when: "Tardor 2016"},
      {name: 'EA', when: "Primavera 2016"},
      {name: 'SX', when: "Tardor 2015"}
    ];
    */
    $scope.getSubjects = function() {
      $scope.filter = undefined;
      $http.get('http://localhost:2709/api/subjects')
        .success(function (data) {
          $scope.subjects = data;
        })
        .error(function (data) {
          console.log('Error: ' + data);
        });
    };


    $ionicModal.fromTemplateUrl('templates/subjectsFilterModal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });


    $scope.closeFilter = function() {
      $scope.modal.hide();
    };

    $scope.showFilter = function() {
      $scope.modal.show();
    };

    $scope.setFilter = function(filter, sortBy) {
      $scope.closeFilter();
      console.log("SortBy: "+sortBy);
      if(sortBy == "students.length")
        $scope.sortReverse = true;
      else
        $scope.sortReverse = false;
      $scope.sortBy = sortBy;
      console.log("getFilteredSubjects");
      if(filter == undefined)
      {
        console.log("No hay filtros");
        return;
      }
      if(filter.name == "")
        filter.name = undefined;
      if(filter.when == "")
        filter.when = undefined;

      console.log("Filter: "+JSON.stringify(filter));
      $http.get('http://localhost:2709/api/subjects/',{
        params: filter
        })
        .success(function(data) {

          console.log(data);
          $scope.subjects = data;

        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
      filter = undefined;
    };
  })


  .controller('SubjectCtrl', function($scope, $stateParams, $http) {

    console.log("SubjectCtrl");

    $http.get('http://localhost:2709/api/subjects/'+$stateParams.id)
      .success(function (data) {
        $scope.subject = data;
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  })


  .controller('StudentCtrl', function($scope, $stateParams, $http) {

    console.log("SubjectCtrl");

    $http.get('http://localhost:2709/api/students/'+$stateParams.id)
      .success(function (data) {
        $scope.student = data;
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  })

  .controller('StudentsCtrl', function($scope, $stateParams, $http, $ionicModal) {

    console.log("StudentsCtrl");
    $scope.sortBy = "name";


    /*
     $scope.subjects = [
     {name: 'IOT', when: "Tardor 2016"},
     {name: 'EA', when: "Primavera 2016"},
     {name: 'SX', when: "Tardor 2015"}
     ];
     */
    $scope.getStudents = function() {
      $scope.filter = undefined;
      $http.get('http://localhost:2709/api/students')
        .success(function (data) {
          $scope.students = data;
        })
        .error(function (data) {
          console.log('Error: ' + data);
        });
    };


    $ionicModal.fromTemplateUrl('templates/studentsFilterModal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });


    $scope.closeFilter = function() {
      $scope.modal.hide();
    };

    $scope.showFilter = function() {
      $scope.modal.show();
    };

    $scope.setFilter = function(filter, sortBy) {
      $scope.closeFilter();
      console.log("SortBy: "+sortBy);
      if(sortBy == "subjects.length")
        $scope.sortReverse = true;
      else
        $scope.sortReverse = false;
      $scope.sortBy = sortBy;

      if(filter == undefined)
      {
        console.log("No hay filtros");
        return;
      }
      if(filter.name == "")
        filter.name = undefined;
      if(filter.when == "")
        filter.when = undefined;

      console.log("Filter: "+JSON.stringify(filter));
      $http.get('http://localhost:2709/api/students/',{
        params: filter
        })
        .success(function(data) {
          console.log(data);
          $scope.students = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
      filter = undefined;
    };
  })




