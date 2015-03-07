app.factory('User', function() {
  return function (spec) {
    spec = spec || {};
    return {
      id: spec.id || '',
      name: spec.name || '',
      password: spec.password || '',
      email: spec.email || ''
    };
  };
});
