app.factory('Task', function() {
  return function (spec) {
    spec = spec || {};
    return {
      "title": spec.title || "",
      "userId": spec.userId || "",
      "taskId": spec.taskId || "",
      "timestamp": spec.timestamp || "",
      "assignedIds": spec.assignedIds,
      "status": spec.status || "",
      "description": spec.description || "",
      "comments": spec.comments,
      "duedate": spec.duedate || "",
      "todos": spec.todos,
      "orderId": spec.orderId
    };
  };
});
