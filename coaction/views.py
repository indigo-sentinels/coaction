from flask import Blueprint, flash, jsonify
from .api_helpers import returns_json, APIView, api_form



coaction = Blueprint("coaction", __name__, static_folder="./static")


@coaction.route("/")
def index():
    return coaction.send_static_file("index.html")

class TaskListView(APIView):
    def get(self):
        return {"tasks": [{
            "taskId": 1,
            "title": "Pick up kid from daycare",
            "userId": 1,
            "timestamp": "2015-03-05",
            "assignedIds":[1, 2, 3],
            "status":"started",
            "description":"kid stabbed another kid with safety scissors",
            "comments":[{"taskId": 1, "commentId": 1, "userId": 2, "text": "OMG! little brady is crazy!"}],
            "dueDate": "2015-03-06",
            "todos":[{"todoId": 1, "userId": 1, "text": "fill up car with gas"}]
        },
            {
            "taskId": 2,
            "title": "Feed child",
            "userId": 1,
            "timestamp": "2015-03-05",
            "assignedIds":[3],
            "status":"New",
            "description":"Little brady hasn't had food in days",
            "comments":[{"taskId": 1, "commentId": 1, "userId": 3, "text": "OMG! little brady is hungry!"}],
            "dueDate": "2015-03-09",
            "todos":[{"taskId": 1, "todoId": 3, "userId": 1, "text": "Make pb and j"}]
            }]
        }

class TaskView(APIView):
    def get(self, id):
        return {
            "taskId": id,
            "title": "Feed child",
            "userId": 1,
            "timestamp": "2015-03-05",
            "assignedIds":[3],
            "status":"New",
            "description":"Little brady hasn't had food in days",
            "comments":[{"taskId": 2, "commentId": 1, "userId": 3, "text": "OMG! little brady is hungry!"}],
            "dueDate": "2015-03-09",
            "todos":[{"taskId": 2, "todoId": 3, "userId": 1, "text": "Make pb and j"}]
            }

coaction.add_url_rule('/tasks', view_func=TaskListView.as_view('tasks'))
coaction.add_url_rule('/tasks/<int:id>', view_func=TaskView.as_view('task'))
