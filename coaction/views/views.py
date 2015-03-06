import json
from flask.ext.login import login_user, current_user
from flask import Blueprint, flash, jsonify, request
from coaction.api_helpers import returns_json, APIView, api_form
from coaction.extensions import db
from coaction.models import TaskSchema, Task
from coaction.forms import TaskForm
from datetime import datetime
from pprint import pprint


coaction = Blueprint("coaction", __name__, static_folder="./static")

@coaction.route("/")
def index():
    return coaction.send_static_file("index.html")

class TaskListView(APIView):
    def get(self):
        tasks = Task.query.all()
        serializer = TaskSchema(many=True)
        result = serializer.dump(tasks)
        return {"tasks": result.data}

    def post(self):
        data = request.get_json(force=True)
        form = TaskForm(data=data, formdata=None, csrf_enabled=False)
        if form.validate():
            task = Task(**form.data)
            task.timestamp = datetime.today()
            db.session.add(task)
            db.session.commit()
            result = TaskSchema().dump(task)
            return result.data
        else:
            return {"form": "not validated"}



class TaskView(APIView):
    def get(self, id):
        task = Task.query.get(id)
        serializer = TaskSchema()
        result = serializer.dump(task)
        return result.data

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
