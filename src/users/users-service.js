app.factory('usersService', ['$http', '$log', function($http, $log) {
  function get(url) {
    return processAjaxPromise($http.get(url));
  }

  function processAjaxPromise(p) {
    return p.then(function (result) {
      return result.data;
    })
    .catch(function (error) {
      $log.log(error);
    });
  }

  return {
    list: function () {
      return get('/api/users/');
    },

    getCurrentUserId: function() {
      return get('/api/currentUserId/').then(function (result) {
        return result.currentUserId;
      });
    },

    viewUser: function (id) {
      return get('/api/users/' + id);
    },

    registerUser: function(user) {
      return processAjaxPromise($http.post('/api/register/', user));
    },

    loginUser: function(user) {
      return processAjaxPromise($http.post('/api/login/', user));
    },

    logoutUser: function() {
      return processAjaxPromise($http.post('/api/logout/'));
    },

    deleteUser: function(id) {
      return processAjaxPromise($http.delete('/api/users/' + id + '/'));
    }
  };
}]);
