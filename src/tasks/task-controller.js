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
