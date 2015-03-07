app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/users/homepage.html',
    controller: 'HomepageCtrl',
    controllerAs: 'vm'
  };

  $routeProvider.when('/', routeDefinition);
}])
.controller('HomepageCtrl', [ '$window', function ( $window) {
  var self = this;
}]);
