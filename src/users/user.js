app.factory('User', function() {
  return function (spec) {
    spec: spec || {};
    return {
      userId: spec.userId || '',
      username: spec.username || '',
      password: spec.password || '',
      email: spec.email || ''
    };
  };
});
