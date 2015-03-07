app.factory('tasksService', ['$http', function($http) {
  function get(url) {
    return processAjaxPromise($http.get(url));
  }

  function processAjaxPromise(p) {
    return p.then(function (result) {
      return result.data;
    })
    .catch(function (error) {
      $log.log(error);
      throw error;
    });
  }

  return {
    list: function () {
      return get('/api/tasks').then(function (result) {
        return result.tasks;
      });
    },

    viewTask: function (id) {
      return get('/api/tasks/' + id);
    },

    addTask: function(task) {
      return processAjaxPromise($http.post('/api/tasks/', task));
    },

    editTask: function (id, task) {
      return processAjaxPromise($http.put('/api/tasks/' + id + '/', task));
    },

    deleteTask: function(id) {
      return processAjaxPromise($http.delete('/api/tasks/' + id + '/'));
    },

    addComment: function(id, comment) {
      return processAjaxPromise($http.post('/api/tasks/' + id + '/comments/', comment));
    }
  };
}]);
