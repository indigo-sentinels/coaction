app.factory('Task', function() {
  return function (spec) {
    spec: spec || {};
    return {
      title: spec.title || '',
      userId: spec.userId || '',
      taskId: spec.taskId || '',
      timestamp: spec.timestamp || '',
      assignedIds: spec.assignedIds || [],
      status: spec.status || '',
      description: spec.description || '',
      comments: spec.comments || [],
      dueDate: spec.dueDate || '',
      todos: spec.todos || []
    };
  };
});
