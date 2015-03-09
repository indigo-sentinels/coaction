app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/users/welcome.html',
    controller: 'WelcomeCtrl',
    controllerAs: 'vm',
    resolve: {
      currentUserId: ['usersService', function (usersService) {
        return usersService.getCurrentUserId();
      }]
    }
  };

  $routeProvider.when('/welcome/', routeDefinition);
}])
.controller('WelcomeCtrl', ['usersService', 'User', '$window', '$currentUserId', function (usersService, User, $window, $currentUserId) {
  var self = this;
  self.id = currentUserId;

  self.goToBoard = function() {
    $window.location.href= "#/tasks/";
    // $window.location.href="#/welcome";
  };
}]);
