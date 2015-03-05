// Declare our app module, and import the ngRoute and ngAnimate
// modules into it.
var app = angular.module('app', ['ngRoute']);

// Set up our 404 handler
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({
    controller: 'Error404Ctrl',
    controllerAs: 'vm',
    templateUrl: 'static/errors/404/error-404.html'
  });
}]);

app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'users/user.html',
    controller: 'UserCtrl',
    controllerAs: 'vm',
    resolve: {
      user: ['usersService', '$route', function (usersService, $route) {
        var routeParams = $route.current.params;
        var id = routeParams.id;
        console.log(id);
        return usersService.viewUser(id);
      }]
    }
  };

  $routeProvider.when('/users/:id', routeDefinition);
}])
.controller('UserCtrl', ['user', function (user) {
  var self = this;
  self.user = user;
}]);

app.factory('User', function() {
  return function (spec) {
    spec: spec || {};
    return {
      userId: spec.userId || '',
      username: spec.username || '',
      password: spec.password || '',
      email: spec.email || ''
    };
  };
});


app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'tasks/task.html',
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
.controller('TaskCtrl', ['task', function (task) {
  var self = this;
  self.task = task;
}]);

app.factory('Task', function() {
  return function (spec) {
    spec: spec || {};
    return {
      title: spec.title || '',
      userId: spec.userId || '',
      taskId: spec.taskId || '',
      timestamp: spec.timestamp || '',
      assignedIds: spec.assignedIds || [],
      status: spec.status || '',
      description: spec.description || '',
      comments: spec.comments || [],
      dueDate: spec.dueDate || '',
      todos: spec.todos || []
    };
  };
});



app.controller('Error404Ctrl', ['$location', function ($location) {
  this.message = 'Could not find: ' + $location.url();
}]);

app.factory('Comment', function() {
  return function (spec) {
    spec: spec || {};
    return {
      commentId: spec.commentId || '',
      taskId: spec.taskId || '',
      userId: spec.userId || '',
      text: spec.text || ''
    };
  };
});

app.factory('Todo', function() {
  return function (spec) {
    spec: spec || {};
    return {
      todoId: spec.todoId || '',
      taskId: spec.taskId || '',
      userId: spec.userId || '',
      text: spec.text || ''
    };
  };
});

//# sourceMappingURL=app.js.map