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
