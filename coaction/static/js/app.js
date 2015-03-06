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
    templateUrl: 'static/tasks/new-task.html',
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

    $window.location.href= "#/tasks";
  };
}]);

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

app.factory('Task', function() {
  return function (spec) {
    spec = spec || {};
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
      todos: spec.todos || [],
      orderId: spec.orderId || ''
    };
  };
});

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

app.factory('tasksService', ['$http', function($http) {
  function get(url) {
    return processAjaxPromise($http.get(url));
  }

  function processAjaxPromise(p) {
    return p.then(function (result) {
      return result.data;
    })
    .catch(function (error) {
      $log.log(error);
      throw error;
    });
  }

  return {
    list: function () {
      return get('/api/tasks').then(function (result) {
        return result.tasks;
      });
    },

    viewTask: function (id) {
      console.log(id);
      return get('/api/tasks/' + id);
    },

    addTask: function(task) {
      return processAjaxPromise($http.post('/api/tasks', task));
    },

    deleteTask: function(id) {
      return processAjaxPromise($http.delete('/api/tasks', id));
    }
  };
}]);

app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/users/new-user.html',
    controller: 'NewUserCtrl',
    controllerAs: 'vm'
  };

  $routeProvider.when('/signup', routeDefinition);
}])
.controller('NewUserCtrl', ['usersService', 'User', '$window', function (usersService, User, $window) {
  var self = this;
  self.user = User();

  self.addUser = function() {
    usersService.addUser(self.user);

    self.user = User();

    $window.location.href= "#/tasks";
  };
}]);

app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/users/user.html',
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
    spec = spec || {};
    return {
      userId: spec.userId || '',
      username: spec.username || '',
      password: spec.password || '',
      email: spec.email || ''
    };
  };
});

app.factory('usersService', ['$http', function($http) {
  function get(url) {
    return processAjaxPromise($http.get(url));
  }

  function processAjaxPromise(p) {
    return p.then(function (result) {
      return result.data;
    })
    .catch(function (error) {
      $log.log(error);
    });
  }

  return {
    list: function () {
      return get('/api/users');
    },

    viewUser: function (id) {
      return get('/api/users/' + id);
    },

    addUser: function(user) {
      return processAjaxPromise($http.post('/api/users', user));
    },

    deleteUser: function(user) {
      return processAjaxPromise($http.delete('/api/users', user));
    }
  };
}]);

app.controller('Error404Ctrl', ['$location', function ($location) {
  this.message = 'Could not find: ' + $location.url();
}]);

app.factory('Comment', function() {
  return function (spec) {
    spec = spec || {};
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
    spec = spec || {};
    return {
      todoId: spec.todoId || '',
      taskId: spec.taskId || '',
      userId: spec.userId || '',
      text: spec.text || ''
    };
  };
});

//# sourceMappingURL=app.js.map