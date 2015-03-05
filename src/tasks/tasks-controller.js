app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'tasks/tasks.html',
    controller: 'TasksCtrl',
    controllerAs: 'vm',
    resolve: {
      tasks: ['tasksService', function (tasksService) {
        return tasksService.list();
      }]
    }
  };

  $routeProvider.when('/tasks/', routeDefinition);
}])
.controller('TasksCtrl', ['tasks', function (tasks) {
  var self = this;
  self.tasks = tasks;
}]);
