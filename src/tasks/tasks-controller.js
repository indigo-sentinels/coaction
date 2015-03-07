app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/tasks/tasks.html',
    controller: 'TasksCtrl',
    controllerAs: 'vm',
    resolve: {
      tasks: ['tasksService', function (tasksService) {
        return tasksService.list();
      }]
    }
  };

  $routeProvider.when('/', routeDefinition);
  $routeProvider.when('/tasks', routeDefinition);
}])
.controller('TasksCtrl', ['tasks', 'tasksService', 'usersService', '$window', function (tasks, tasksService, usersService, $window) {
  var self = this;
  self.tasks = tasks;

  self.deleteTask = function (id) {
    tasksService.deleteTask(id);
  };

  // self.markDone = function (task) {
  //   tasksService.editTask(task);
  // };

  self.editTask = function (id) {
    $window.location.href= '#/tasks/' + id;
  };

  self.logoutUser = function() {
    usersService.logoutUser();
    $window.location.href= '#/login/';
  };
}]);
