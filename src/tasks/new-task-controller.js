app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'tasks/new-task.html',
    controller: 'NewTaskCtrl',
    controllerAs: 'vm'
  };

  $routeProvider.when('/tasks/new', routeDefinition);
}])
.controller('NewTaskCtrl', ['tasksService', 'Task', '$window', function (tasksService, Task, $window) {
  var self = this;
  self.task = Task();

  self.addTask = function() {
    tasksService.addTask(self.task);

    self.task = Task();

    // $window.location.href= "#/shares"; TODO
}]);
