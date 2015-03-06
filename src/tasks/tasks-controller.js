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
.controller('TasksCtrl', ['tasks', 'tasksService', function (tasks, tasksService) {
  var self = this;
  self.tasks = tasks;

  self.deleteTask = function (id) {
    tasksService.deleteTask(id);
  };

  self.markDone = function (task) {
    task.status = "Done";
  };
}]);
