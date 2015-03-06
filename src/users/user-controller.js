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
