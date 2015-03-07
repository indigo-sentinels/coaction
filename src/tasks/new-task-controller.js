app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/tasks/task-input-view.html',
    controller: 'NewTaskCtrl',
    controllerAs: 'vm'
  };

  $routeProvider.when('/tasks/new', routeDefinition);
}])
.controller('NewTaskCtrl', ['tasksService', 'Task', '$window', function (tasksService, Task, $window) {
  var self = this;
  self.task = Task();
  console.log(self.task);

  self.addTask = function() {
    if (!self.task.taskId) {
      tasksService.addTask(self.task);
      self.task = Task();
    } else {
      tasksService.editTask(self.task);
    }

    $window.location.href= "#/tasks";
  };
}]);
