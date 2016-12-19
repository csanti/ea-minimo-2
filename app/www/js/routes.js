angular.module('app.routes', [])

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('app', {
        url: '/app',
        templateUrl: 'templates/menu.html'
      })

      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html'
          }
        }
      })

      .state('app.subjects', {
        url: '/subjects',
        views: {
          'menuContent': {
            templateUrl: 'templates/subjects.html',
            controller: "SubjectsCtrl"
          }
        }
      })
      .state('app.subject', {
        url: '/subject/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/subjectView.html',
            controller: 'SubjectCtrl'
          }
        }
      })
      .state('app.students', {
        url: '/students',
        views: {
          'menuContent': {
            templateUrl: 'templates/students.html',
            controller: "StudentsCtrl"
          }
        }
      })
      .state('app.student', {
        url: '/student/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/studentView.html',
            controller: 'StudentCtrl'
          }
        }
      });


    $urlRouterProvider.otherwise('/app/home')



  });
