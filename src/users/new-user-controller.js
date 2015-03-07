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
    usersService.registerUser(self.user);

    self.user = User();

    $window.location.href= "#/tasks";
  };
}]);
