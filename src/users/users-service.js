app.factory('usersService', ['$http', function($http) {
  function get(url) {
    return processAjaxPromise($http.get(url));
  }

  function processAjaxPromise(p) {
    return p.then(function (result) {
      console.log(result.data);
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
