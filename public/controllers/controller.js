app.controller("controller", function($scope, $http, $routeParams) {
    console.log("Controlador");


    $scope.getSubjects = function() {
        console.log("getSubjects");
        $http.get('http://localhost:2709/api/subjects')
            .success(function(data) {
                $scope.subjects = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }


    //esta función devuelve la subject con todos los usuarios matriculados
    $scope.getSubject = function() {
        $http.get('http://localhost:2709/api/subjects/'+$routeParams.id)
            .success(function(data) {
                console.log("getSubject ok");
                console.log(data);
                $scope.subject = data;

            })
            .error(function(data) {
                console.log('Error: ' + data);
        });
    };

    $scope.getFilteredSubjects = function(filter) {
        console.log("getFilteredSubjects");
        if(filter == undefined)
        {
            console.log("No hay filtros");
            $scope.getSubjects();
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
                console.log("getSubject ok");
                console.log(data);
                $scope.subjects = data;

            })
            .error(function(data) {
                console.log('Error: ' + data);
        });
        filter = undefined;

    }

    /*
    $scope.addStudent = function(student) {
        console.log("add student");
        $http.post('http://localhost:2709/api/subjects/'+$routeParams.id+'/students', student)
            .success(function(data) {
                console.log("Usuario creado ");
                console.log(data);
                $scope.subject.students.push(data);
                user = {};

            })
            .error(function(data) {

            });
    };
    */
});
