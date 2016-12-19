var app = angular.module("app", ['ngRoute']);


app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "/views/lista.html",
            controller: "controller"
        }).when("/subject/:id", {
            templateUrl : "/views/viewSubject.html",
            controller: "controller"

    });
});

