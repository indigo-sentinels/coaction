app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/users/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'vm'
  };

  $routeProvider.when('/login/', routeDefinition);
}])
.controller('LoginCtrl', ['usersService', 'User', '$window', function (usersService, User, $window) {
  var self = this;
  self.user = User();

  self.loginUser = function() {
    usersService.loginUser(self.user);

    self.user = User();

    $window.location.href= "#/tasks";
  };
}]);
