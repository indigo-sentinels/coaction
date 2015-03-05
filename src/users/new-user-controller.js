app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'users/new-user.html',
    controller: 'NewUserCtrl',
    controllerAs: 'vm'
  };

  $routeProvider.when('/users/new', routeDefinition);
}])
.controller('NewUserCtrl', ['usersService', 'User', '$window', function (usersService, User, $window) {
  var self = this;
  self.user = User();

  self.addUser = function() {
    usersService.addUser(self.user);

    self.user = User();

    // $window.location.href= "#/shares"; TODO
}]);
