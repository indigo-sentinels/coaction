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
    usersService.loginUser(self.user).then(function() {
      return self.redirectLogin();
    });

    // self.user = User();
  };

  self.redirectLogin = function() {
    $window.location.href= "#/tasks";
  };
}]);
