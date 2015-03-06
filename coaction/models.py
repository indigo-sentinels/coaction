from .extensions import db, login_manager
from flask.ext.login import UserMixin, current_user
from marshmallow import Schema, fields
from sqlalchemy import func
from datetime import datetime


@login_manager.user_loader
def load_user(id):
    return User.query.get(id)


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    encryptedPassword = db.Column(db.String(60))


    def get_password(self):
        return getattr(self, "_password", None)

    def set_password(self, password):
        self._password = password
        self.encrypted_password = bcrypt.generate_password_hash(password)

    password = property(get_password, set_password)

    def check_password(self, password):
        return bcrypt.check_password_hash(self.encrypted_password, password)

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
        self.userId = 1
        self.text = text

class CommentSchema(Schema):
    class Meta:
        fields = ('id', 'taskId', 'userId', 'text')


class Task(db.Model):
    taskId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255))
    status = db.Column(db.String(255), default="New")
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    timestamp = db.Column(db.DateTime)
    duedate = db.Column(db.DateTime)
    description = db.Column(db.String(255))
    orderId = db.Column(db.Integer)
    assignedIds = db.Column(db.Integer)
    user = db.relationship('User',
                           backref=db.backref('tasks', lazy='dynamic'))

    def check_date(self, date):
        if date == None:
            return None
        else:
            return datetime.strptime(date, "%Y/%m/%d")


    def __init__(self, title, status, duedate, description, assignedIds, orderId, comments):
        self.title = title
        self.status = status
        self.duedate = self.check_date(duedate)
        self.description = description
        self.assignedIds = assignedIds
        self.orderId = orderId
        self.comments = comments


class TaskSchema(Schema):
    comments = fields.Nested(CommentSchema, many=True)

    class Meta:
        fields = ('taskId', 'title', 'status', 'timestamp', 'duedate', 'description', 'assignedIds', 'orderId', 'comments')



class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    taskId = db.Column(db.Integer, db.ForeignKey('task.taskId'))
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    text = db.Column(db.String(255), nullable=False)
    task = db.relationship('Task',
                           backref=db.backref('todos', lazy='dynamic'))
