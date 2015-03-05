app.factory('Todo', function() {
  return function (spec) {
    spec = spec || {};
    return {
      todoId: spec.todoId || '',
      taskId: spec.taskId || '',
      userId: spec.userId || '',
      text: spec.text || ''
    };
  };
});
