app.factory('Comment', function() {
  return function (spec) {
    spec = spec || {};
    return {
      commentId: spec.commentId || '',
      taskId: spec.taskId || '',
      userId: spec.userId || '',
      text: spec.text || ''
    };
  };
});
