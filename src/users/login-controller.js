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
  self.id = undefined;

  self.loginUser = function() {
    usersService.viewUser(self.user).then(function() {
      self.id = self.user.id;
    })
    .then(function() {
      usersService.loginUser(self.user).then(function() {
        return self.redirectLogin();
      });
    });

    // self.user = User();
  };

  self.redirectLogin = function() {
    $window.location.href= "#/users/" + self.user.id + "/tasks/";
  };
}]);
