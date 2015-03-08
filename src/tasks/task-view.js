app.directive('taskView', function () {
  return {
    // E = element
    // A = attribute
    // C = class (I wouldn't use this)
    // M = comment (I wouldn't use this, either)
    restrict: 'EA',
    scope: {
      // @ - Get value from attribute
      // = - Value has 2-way binding
      // & - Allows binding to a function
      task: '=',
      cssClass: '@'
    },
    controller: ['$scope', function ($scope) {
      this.task = $scope.task;
      this.cssClass = $scope.cssClass || '';
    }],
    controllerAs: 'vm',
    templateUrl: 'static/tasks/task-view.html',
    link: function ($scope, element, attrs) {
      // If you need to manipulate the DOM, this is the
      // only legit place to do it in the Angular world
    }
  };
});
