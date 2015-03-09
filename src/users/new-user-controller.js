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
