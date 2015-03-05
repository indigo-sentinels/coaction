app.factory('tasksService', ['$http', function($http) {
  function get(url) {
    return processAjaxPromise($http.get(url));
  }

  function processAjaxPromise(p) {
    return p.then(function (result) {
      return result.data.tasks;
    })
    .catch(function (error) {
      $log.log(error);
    });
  }

  return {
    list: function () {
      return get('/api/tasks');
    },

    viewTask: function (id) {
      return get('/api/tasks/' + id);
    },

    addTask: function(task) {
      return processAjaxPromise($http.post('/api/tasks', task));
    },

    deleteTask: function(task) {
      return processAjaxPromise($http.delete('/api/tasks', task));
    }
  };
}]);
