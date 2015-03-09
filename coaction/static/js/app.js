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
  self.commentDeleted = undefined;
  self.todoDeleted = undefined;

  self.deleteTask = function (id) {
    tasksService.deleteTask(id);

    $window.location.href = "#/tasks/";
  };

  self.deleteComment = function (taskId, comment) {
    console.log(taskId);
    console.log(comment.id);
    var commentId = comment.id;
    tasksService.deleteComment(taskId, commentId);
    self.commentDeleted = true;
  };

    self.deleteTodo = function (taskId, todo) {
      var todoId = todo.id;
      tasksService.deleteTodo(taskId, todoId);
      self.todoDeleted = true;
    };

  self.addTask = function() {
    console.log(self.task);
    tasksService.editTask(self.task.taskId, self.task);

    $window.location.href= "#/tasks";
  };
}]);

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
  self.commentAdded = undefined;
  self.todoAdded = undefined;

  self.editTask = function (id) {
    $window.location.href= '#/tasks/' + id + '/edit/';
  };

  self.deleteTask = function (id) {
    tasksService.deleteTask(id);

    $window.location.href = "#/tasks/";
  };

  self.createComment = function (taskId, userId, text) {
    self.task.comments.push({
      taskId: taskId || '',
      userId: userId || '',
      text: text || ''
    });

    self.commentAdded = true;
  };

  self.addComment = function (id, comment) {
    tasksService.addComment(id, comment);
    self.commentAdded = undefined;
    // $window.location.href = '#/tasks/' + id;
  };

  self.createTodo = function (taskId, userId, text) {
    self.task.todos.push({
      taskId: taskId || '',
      userId: userId || '',
      text: text || ''
    });

    self.todoAdded = true;
  };

  self.addTodo = function (id, todo) {
    tasksService.addTodo(id, todo);
    self.todoAdded = undefined;
    // $window.location.href = '#/tasks/' + id;
  };
}]);

app.directive('taskInputView', function () {
  return {
    // E = element
    // A = attribute
    // C = class (I wouldn't use this)
    // M = comment (I wouldn't use this, either)
    restrict: 'EA',
    scope: {
      // @ - Get value from attribute
      // = - Value has 2-way binding
      // & - Allows binding to a function
      task: '=',
      cssClass: '@'
    },
    controller: ['$scope', function ($scope) {
      this.task = $scope.task;
      this.cssClass = $scope.cssClass || '';
    }],
    controllerAs: 'vm',
    templateUrl: 'static/tasks/task-input-view.html',
    link: function ($scope, element, attrs) {
      // If you need to manipulate the DOM, this is the
      // only legit place to do it in the Angular world
    }
  };
});

app.directive('taskView', function () {
  return {
    // E = element
    // A = attribute
    // C = class (I wouldn't use this)
    // M = comment (I wouldn't use this, either)
    restrict: 'EA',
    scope: {
      // @ - Get value from attribute
      // = - Value has 2-way binding
      // & - Allows binding to a function
      task: '=',
      cssClass: '@'
    },
    controller: ['$scope', function ($scope) {
      this.task = $scope.task;
      this.cssClass = $scope.cssClass || '';
    }],
    controllerAs: 'vm',
    templateUrl: 'static/tasks/task-view.html',
    link: function ($scope, element, attrs) {
      // If you need to manipulate the DOM, this is the
      // only legit place to do it in the Angular world
    }
  };
});

app.factory('Task', function() {
  return function (spec) {
    spec = spec || {};
    return {
      "title": spec.title || "",
      "userId": spec.userId || "",
      "taskId": spec.taskId || "",
      "timestamp": spec.timestamp || "",
      "assignedIds": spec.assignedIds,
      "status": spec.status || "todo",
      "description": spec.description || "",
      "comments": spec.comments,
      "duedate": spec.duedate || "",
      "todos": spec.todos,
      "orderId": spec.orderId
    };
  };
});

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

app.factory('tasksService', ['$http', '$log', function($http, $log) {
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
      return get('/api/tasks/').then(function (result) {
        return result.tasks;
      });
    },

    viewTask: function (id) {
      return get('/api/tasks/' + id);
    },

    getTasksByUserId: function (id) {
      return get('/api/users/' + id + "/tasks/");
    },

    addTask: function(task) {
      return processAjaxPromise($http.post('/api/tasks/', task));
    },

    editTask: function (id, task) {
      return processAjaxPromise($http.put('/api/tasks/' + id + '/', task));
    },

    deleteTask: function(id) {
      return processAjaxPromise($http.delete('/api/tasks/' + id + '/'));
    },

    addComment: function(id, comment) {
      return processAjaxPromise($http.post('/api/tasks/' + id + '/comments/', comment));
    },

    deleteComment: function(id, commentId) {
      return processAjaxPromise($http.delete('/api/tasks/' + id + '/comments/' + commentId + '/'));
    },

    addTodo: function(id, todo) {
      return processAjaxPromise($http.post('/api/tasks/' + id + '/todos/', todo));
    },

    deleteTodo: function(id, todoId) {
      return processAjaxPromise($http.delete('/api/tasks/' + id + '/todos/' + todoId + '/'));
    }
  };
}]);

app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/users/homepage.html',
    controller: 'HomepageCtrl',
    controllerAs: 'vm'
  };

  $routeProvider.when('/', routeDefinition);
}])
.controller('HomepageCtrl', [ '$window', function ( $window) {
  var self = this;
}]);

app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/users/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'vm'
  };

  $routeProvider.when('/login/', routeDefinition);
}])
.controller('LoginCtrl', ['usersService', 'User', '$window', '$currentUserId', function (usersService, User, $window, $currentUserId) {
  var self = this;
  self.user = User();
  self.id = currentUserId;

  self.loginUser = function() {

    usersService.loginUser(self.user).then(function() {
      return self.redirectLogin();
    });
    // self.user = User();
  };

  self.redirectLogin = function() {
    // $window.location.href= "#/users/" + self.id + "/tasks/";
    $window.location.href="#/welcome";
  };
}]);

app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/users/new-user.html',
    controller: 'NewUserCtrl',
    controllerAs: 'vm'
  };

  $routeProvider.when('/signup/', routeDefinition);
}])
.controller('NewUserCtrl', ['usersService', 'User', '$window', function (usersService, User, $window) {
  var self = this;
  self.user = User();

  self.addUser = function() {
    usersService.registerUser(self.user).then(function() {
      return self.redirectRegister();
    });

    // self.user = User();
  };

  self.redirectRegister = function () {
    $window.location.href= "#/login";
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
      id: spec.id || '',
      name: spec.name || '',
      password: spec.password || '',
      email: spec.email || ''
    };
  };
});

app.factory('usersService', ['$http', '$log', function($http, $log) {
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
      return get('/api/users/');
    },

    getCurrentUserId: function() {
      return get('/api/users/currentUserId/');
    },

    viewUser: function (id) {
      return get('/api/users/' + id);
    },

    registerUser: function(user) {
      return processAjaxPromise($http.post('/api/register/', user));
    },

    loginUser: function(user) {
      return processAjaxPromise($http.post('/api/login/', user));
    },

    logoutUser: function() {
      return processAjaxPromise($http.post('/api/logout/'));
    },

    deleteUser: function(id) {
      return processAjaxPromise($http.delete('/api/users/' + id + '/'));
    }
  };
}]);

app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/users/welcome.html',
    controller: 'WelcomeCtrl',
    controllerAs: 'vm',
    resolve: {
      currentUserId: ['usersService', function (usersService) {
        return usersService.getCurrentUserId();
      }]
    }
  };

  $routeProvider.when('/welcome/', routeDefinition);
}])
.controller('WelcomeCtrl', ['usersService', 'User', '$window', '$currentUserId', function (usersService, User, $window, $currentUserId) {
  var self = this;
  self.id = currentUserId;

  self.goToBoard = function() {
    $window.location.href= "#/tasks/";
    // $window.location.href="#/welcome";
  };
}]);

app.controller('Error404Ctrl', ['$location', function ($location) {
  this.message = 'Could not find: ' + $location.url();
}]);

app.factory('Comment', function() {
  return function (spec) {
    spec = spec || {};
    return {
      id: spec.id || '',
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
      id: spec.id || '',
      taskId: spec.taskId || '',
      userId: spec.userId || '',
      text: spec.text || ''
    };
  };
});

//# sourceMappingURL=app.js.map