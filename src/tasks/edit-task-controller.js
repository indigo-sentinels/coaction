app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/tasks/task-input-view.html',
    controller: 'EditTaskCtrl',
    controllerAs: 'vm',
    resolve: {
      task: ['tasksService', '$route', function (tasksService, $route) {
        var routeParams = $route.current.params;
        var id = routeParams.id;
        return tasksService.viewTask(id);
      }]
    }
  };

  $routeProvider.when('/tasks/:id/edit', routeDefinition);
}])
.controller('EditTaskCtrl', ['task', 'tasksService', '$window', function (task, tasksService, $window) {
  var self = this;
  self.task = task;

  self.deleteTask = function (id) {
    tasksService.deleteTask(id);

    $window.location.href = "#/tasks/";
  };

  self.addTask = function() {
    console.log(self.task);
    tasksService.editTask(self.task.taskId, self.task);

    $window.location.href= "#/tasks";
  };
}]);
