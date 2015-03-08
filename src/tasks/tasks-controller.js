app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/tasks/tasks.html',
    controller: 'TasksCtrl',
    controllerAs: 'vm',
    resolve: {
      tasks: ['tasksService', function (tasksService) {
        return tasksService.list();
      }]
      // user: ['tasksService', function (usersService) {
      //   return usersService.viewUser()
      // }]
    }
  };

  // $routeProvider.when('/', routeDefinition);
  $routeProvider.when('/tasks', routeDefinition);
}])
.controller('TasksCtrl', ['tasks', 'tasksService', 'usersService', '$window', function (tasks, tasksService, usersService, $window) {
  var self = this;
  self.name;
  self.user;

  self.tasks = tasks;

  self.goToNewTask = function () {
    $window.location.href = '#/tasks/new/';
  };

  self.deleteTask = function (id) {
    tasksService.deleteTask(id);
  };

  self.getUserName = function (id) {
    console.log(id);

    self.user = usersService.viewUser(id);

    console.log(self.user);

    self.name = self.user.name;
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
