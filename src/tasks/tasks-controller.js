app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/tasks/tasks.html',
    controller: 'TasksCtrl',
    controllerAs: 'vm',
    resolve: {
      tasks: ['tasksService', '$route', function (tasksService, $route) {
        var routeParams = $route.current.params;
        var id = routeParams.id;
        return tasksService.getTasksByUserId(id);
      }]
    }
  };

  // $routeProvider.when('/', routeDefinition);
  $routeProvider.when('/users/:id/tasks', routeDefinition);
}])
.controller('TasksCtrl', ['tasks', 'tasksService', 'usersService', '$window', function (tasks, tasksService, usersService, $window) {
  var self = this;
  // self.name;
  // self.user;
  console.log(tasks);

  self.tasks = tasks;

  self.goToNewTask = function () {
    $window.location.href = '#/tasks/new/';
  };

  self.deleteTask = function (id) {
    tasksService.deleteTask(id);
  };

  self.getUserName = function (id) {
    console.log(id);

    // self.user = usersService.viewUser(id);
    //
    // console.log(self.user);
    //
    // self.name = self.user.name;
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
