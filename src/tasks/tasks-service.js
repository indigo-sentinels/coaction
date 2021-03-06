app.factory('tasksService', ['$http', '$log', function($http, $log) {
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
      return get('/api/tasks/').then(function (result) {
        return result.tasks;
      });
    },

    viewTask: function (id) {
      return get('/api/tasks/' + id);
    },

    listByUserId: function (id) {
      return get('/api/users/' + id + '/tasks/').then(function(result) {
        return result.tasks;
      });
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
    },

    deleteComment: function(id, commentId) {
      return processAjaxPromise($http.delete('/api/tasks/' + id + '/comments/' + commentId + '/'));
    },

    addTodo: function(id, todo) {
      return processAjaxPromise($http.post('/api/tasks/' + id + '/todos/', todo));
    },

    deleteTodo: function(id, todoId) {
      return processAjaxPromise($http.delete('/api/tasks/' + id + '/todos/' + todoId + '/'));
    }
  };
}]);
