app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/tasks/task.html',
    controller: 'TaskCtrl',
    controllerAs: 'vm',
    resolve: {
      task: ['tasksService', '$route', function (tasksService, $route) {
        var routeParams = $route.current.params;
        var id = routeParams.id;
        return tasksService.viewTask(id);
      }]
    }
  };

  $routeProvider.when('/tasks/:id', routeDefinition);
}])
.controller('TaskCtrl', ['task', 'tasksService', '$window', function (task, tasksService, $window) {
  var self = this;
  self.task = task;

  self.deleteTask = function (id) {
    tasksService.deleteTask(id);

    $window.location.href = "#/tasks/";
  };
}]);
