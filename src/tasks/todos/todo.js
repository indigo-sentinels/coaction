app.factory('Todo', function() {
  return function (spec) {
    spec = spec || {};
    return {
      id: spec.id || '',
      taskId: spec.taskId || '',
      userId: spec.userId || '',
      text: spec.text || ''
    };
  };
});
