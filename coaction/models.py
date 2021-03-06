from .extensions import db, login_manager
from flask.ext.login import UserMixin, current_user
from marshmallow import Schema, fields
from flask import session
from werkzeug.security import generate_password_hash, check_password_hash



@login_manager.user_loader
def load_user(id):
    return User.query.get(id)

# ---------------------- MODELS --------------------------


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    encryptedPassword = db.Column(db.String(100))


    def get_password(self):
        return getattr(self, "_password", None)

    def set_password(self, password):
        self._password = password
        self.encryptedPassword = generate_password_hash(password)

    password = property(get_password, set_password)

    def check_password(self, password):
        return check_password_hash(self.encryptedPassword, password)

    def __repr__(self):
        return "<User {}>".format(self.email)


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    taskId = db.Column(db.Integer, db.ForeignKey('task.taskId'))
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    text = db.Column(db.String(255), nullable=False)
    task = db.relationship('Task',
                           backref=db.backref('comment_list', lazy='dynamic'))

    def __init__(self, taskId, text):
        self.taskId = taskId
        self.userId = current_user.id
        self.text = text


class Task(db.Model):
    taskId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255))
    status = db.Column(db.String(255), default="New")
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    timestamp = db.Column(db.String(255))
    duedate = db.Column(db.String(255))
    description = db.Column(db.String(255))
    orderId = db.Column(db.Integer)
    assignedIds = db.Column(db.Integer)
    listId = db.Column(db.Integer)
    user = db.relationship('User',
                           backref=db.backref('tasks', lazy='dynamic'))


    def __init__(self, title, status, duedate, description, assignedIds, orderId, comments, todos, listId):
        self.title = title
        self.status = status
        self.duedate = duedate
        self.description = description
        self.assignedIds = assignedIds
        self.orderId = orderId
        self.comments = comments
        self.todos = todos
        self.userId = current_user.id
        self.listId = listId


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    taskId = db.Column(db.Integer, db.ForeignKey('task.taskId'))
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    text = db.Column(db.String(255), nullable=False)
    status = db.Column(db.Text, default="New")
    task = db.relationship('Task',
                           backref=db.backref('task_todos', lazy='dynamic'))

    def __init__(self, taskId, text, status):
        self.taskId = taskId
        self.userId = current_user.id
        self.text = text
        self.status = status


# --------------------- SCHEMAS ----------------------

class UserSchema(Schema):
    class Meta:
        fields = ("id", "name", "email", "encryptedPassword")


class TodoSchema(Schema):
    class Meta:
        fields = ("id", "taskId", "userId", "text")


class CommentSchema(Schema):
    class Meta:
        fields = ('id', 'taskId', 'userId', 'text')


class TaskSchema(Schema):
    comments = fields.Nested(CommentSchema, many=True)
    todos = fields.Nested(TodoSchema, many=True)

    class Meta:
        fields = ('taskId', 'title',
                  'status', 'timestamp',
                  'duedate', 'description',
                  'assignedIds', 'orderId',
                  'comments', 'todos',
                  'userId', 'listId')
