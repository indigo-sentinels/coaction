import json
from flask.ext.login import login_user, current_user
from flask import Blueprint, flash, jsonify, request
from coaction.api_helpers import returns_json, APIView, api_form
from coaction.extensions import db
from coaction.models import TaskSchema, Task
from coaction.forms import TaskForm
from datetime import date
from pprint import pprint


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
            "orderId":1,
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
            "orderId": 2,
            "timestamp": "2015-03-05",
            "assignedIds":[3],
            "status":"New",
            "description":"Little brady hasn't had food in days",
            "comments":[{"taskId": 1, "commentId": 1, "userId": 3, "text": "OMG! little brady is hungry!"}],
            "dueDate": "2015-03-09",
            "todos":[{"taskId": 1, "todoId": 3, "userId": 1, "text": "Make pb and j"}]
            }]
        }

    def post(self):
        data = request.get_json(force=True)
        form = TaskForm(data=data, formdata=None, csrf_enabled=False)
        if form.validate():
            task = Task(**form.data)
            db.session.add(task)
            db.session.commit()
            result = TaskSchema().dump(task)
            return result.data
        else:
            return {"form": "not validated"}



class TaskView(APIView):
    def get(self, id):
        return {
            "taskId": id,
            "title": "Feed child",
            "userId": 1,
            "orderId": 1,
            "timestamp": "2015-03-05",
            "assignedIds":[3],
            "status":"New",
            "description":"Little brady hasn't had food in days",
            "comments":[{"taskId": 2, "commentId": 1, "userId": 3, "text": "OMG! little brady is hungry!"}],
            "dueDate": "2015-03-09",
            "todos":[{"taskId": 2, "todoId": 3, "userId": 1, "text": "Make pb and j"}]
            }

class UserView(APIView):
    def get(self, id):
        return {
            "user_id": 1,
            "username": "JohnPM",
            "encrypted_password": "jkalfsd932ut0invlafsdga",
            "email": "J@J.J"
        }


coaction.add_url_rule('/tasks/', view_func=TaskListView.as_view('tasks'))
coaction.add_url_rule('/tasks/<int:id>/', view_func=TaskView.as_view('task'))
coaction.add_url_rule('/users/<int:id>/', view_func=UserView.as_view('user'))
