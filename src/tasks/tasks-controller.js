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
.controller('TasksCtrl', ['tasks', 'tasksService', '$window', function (tasks, tasksService, $window) {
  var self = this;
  self.tasks = tasks;

  self.deleteTask = function (id) {
    tasksService.deleteTask(id);
  };

  self.markDone = function (task) {
    task.status = "Done";
  };

  self.editTask = function (id) {
    $window.location.href= '#/tasks/' + id;
  };
}]);
