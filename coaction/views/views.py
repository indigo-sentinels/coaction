import json
from flask.ext.login import login_user, current_user
from flask import Blueprint, flash, jsonify, request
from coaction.api_helpers import returns_json, APIView, api_form
from coaction.extensions import db
from coaction.models import TaskSchema, Task, Comment, CommentSchema
from coaction.forms import TaskForm, CommentForm
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
        task = Task.query.get_or_404(id)
        serializer = TaskSchema()
        result = serializer.dump(task)
        return result.data

    def delete(self, id):
        task = Task.query.get_or_404(id)
        db.session.delete(task)
        db.session.commit()
        serializer = TaskSchema()
        result = serializer.dump(task)
        return {"deleted": result.data}

    def put(self, id):
        data = request.get_json(force=True)
        task = Task.query.get_or_404(id)
        for key, value in data.items():
            setattr(task, key, value)
        form = TaskForm(obj=task, csrf_enabled=False)
        if form.validate():
            db.session.add(task)
            db.session.commit()
            result = TaskSchema().dump(task)
            return result.data
        else:
            return {"form": "not validated"}

class CommentListView(APIView):
    def get(self, id):
        comments = Comment.query.filter_by(taskId = id)
        serializer = CommentSchema(many=True)
        result = serializer.dump(comments)
        return {"comments": result.data}

    def post(self, id):
        data = request.get_json()
        form = CommentForm(data=data, formdata=None, csrf_enabled=False)
        if form.validate():
            comment = Comment(**form.data)
            task = Task.query.filter_by(taskId = id).first()
            comment.taskId = task.taskId
            db.session.add(comment)
            db.session.commit()
            result = CommentSchema().dump(comment)
            return result.data
        else:
            return {"form": "not validated"}

class CommentView(APIView):

    def delete(self, task, comment):
        comment = Comment.query.get_or_404(comment)
        db.session.delete(comment)
        db.session.commit()
        serializer = CommentSchema()
        result = serializer.dump(comment)
        return {"deleted from task {}".format(task): result.data}

    def get(self, task, comment):
        comment = Comment.query.get_or_404(comment)
        serializer = CommentSchema()
        result = serializer.dump(comment)
        return {"from task {}".format(task): result.data}


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
coaction.add_url_rule('/tasks/<int:id>/comments/', view_func=CommentListView.as_view('comments'))
coaction.add_url_rule('/tasks/<int:task>/comments/<int:comment>/', view_func=CommentView.as_view('comment'))
