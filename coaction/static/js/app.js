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


app.controller('Error404Ctrl', ['$location', function ($location) {
  this.message = 'Could not find: ' + $location.url();
}]);



//# sourceMappingURL=app.js.map