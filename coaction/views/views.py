from flask import Blueprint, flash, jsonify, request
from coaction.api_helpers import returns_json, APIView, api_form
from coaction.extensions import db
from coaction.models import TaskSchema, Task, Comment, CommentSchema, TodoSchema, Todo
from coaction.forms import TaskForm, CommentForm, TodoForm
from flask.ext.login import login_required
from datetime import datetime
import json
from pprint import pprint


coaction = Blueprint("coaction", __name__, static_folder="./static")

@coaction.route("/")
def index():
    return coaction.send_static_file("index.html")


class TaskListView(APIView):
    @login_required
    def get(self):
        tasks = Task.query.all()
        serializer = TaskSchema(many=True)
        result = serializer.dump(tasks)
        return {"tasks": result.data}

    @login_required
    def post(self):
        data = request.get_json(force=True)
        form = TaskForm(data=data, formdata=None, csrf_enabled=False)
        if form.validate():
            task = Task(**form.data)
            task.timestamp = datetime.today()
            if Task.query.get(1):
                _task = Task.query.order_by(-(Task.taskId)).first()
                x = _task.taskId
                task.orderId = x+1
            else:
                task.orderId = 1
            db.session.add(task)
            db.session.commit()
            result = TaskSchema().dump(task)
            return result.data
        else:
            return {"form": "not validated"}



class TaskView(APIView):
    @login_required
    def get(self, id):
        task = Task.query.get_or_404(id)
        comments = Comment.query.filter_by(taskId = id).all()
        todos = Todo.query.filter_by(taskId = id).all()
        task.comments = comments
        task.todos = todos
        task_serializer = TaskSchema()
        task_result = task_serializer.dump(task)
        return task_result.data

    @login_required
    def delete(self, id):
        task = Task.query.get_or_404(id)
        db.session.delete(task)
        db.session.commit()
        serializer = TaskSchema()
        result = serializer.dump(task)
        return {"deleted": result.data}

    @login_required
    def put(self, id):
        data = request.get_json(force=True)
        task = Task.query.get_or_404(id)
        for key, value in data.items():
            setattr(task, key, value)
        db.session.add(task)
        db.session.commit()
        result = TaskSchema().dump(task)
        return result.data

class CommentListView(APIView):
    @login_required
    def get(self, id):
        comments = Comment.query.filter_by(taskId = id)
        serializer = CommentSchema(many=True)
        result = serializer.dump(comments)
        return {"comments": result.data}

    @login_required
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
    @login_required
    def delete(self, task, comment):
        comment = Comment.query.get_or_404(comment)
        db.session.delete(comment)
        db.session.commit()
        serializer = CommentSchema()
        result = serializer.dump(comment)
        return {"deleted from task {}".format(task): result.data}

    @login_required
    def get(self, task, comment):
        comment = Comment.query.get_or_404(comment)
        serializer = CommentSchema()
        result = serializer.dump(comment)
        return {"from task {}".format(task): result.data}

class TodoListView(APIView):
    @login_required
    def get(self, task):
        todos = Todo.query.filter_by(taskId = task).all()
        serializer = TodoSchema(many=True)
        result = serializer.dump(todos)
        return {"todos": result.data}

    @login_required
    def post(self, task):
        data = request.get_json()
        form = TodoForm(data=data, formdata=None, csrf_enabled=False)
        if form.validate():
            todo = Todo(**form.data)
            todo.taskId = task
            db.session.add(todo)
            db.session.commit()
            serializer = TodoSchema()
            result = serializer.dump(todo)
            return result.data


class TodoView(APIView):
    @login_required
    def get(self, task, todo):
        todo = Todo.query.filter_by(id = todo).first()
        serializer = TodoSchema()
        result = serializer.dump(todo)
        return result.data

    @login_required
    def delete(self, task, todo):
        todo = Todo.query.filter_by(id = todo).first()
        db.session.delete(todo)
        db.session.commit()
        serializer = TodoSchema()
        result = serializer.dump(todo)
        return {"deleted": result.data}


coaction.add_url_rule('/tasks/', view_func=TaskListView.as_view('tasks'))
coaction.add_url_rule('/tasks/<int:id>/', view_func=TaskView.as_view('task'))
coaction.add_url_rule('/tasks/<int:id>/comments/', view_func=CommentListView.as_view('comments'))
coaction.add_url_rule('/tasks/<int:task>/comments/<int:comment>/', view_func=CommentView.as_view('comment'))
coaction.add_url_rule('/tasks/<int:task>/todos/', view_func=TodoListView.as_view('todos'))
coaction.add_url_rule('/tasks/<int:task>/todos/<int:todo>', view_func=TodoView.as_view('todo'))
