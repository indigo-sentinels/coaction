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
.controller('TaskCtrl', ['task', 'tasksService', function (task, tasksService) {
  var self = this;
  self.task = task;
  console.log(self.task);
  
  self.deleteTask = function (id) {
    tasksService.deleteTask(id);
  };
}]);
