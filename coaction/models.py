from .extensions import db, login_manager
from flask.ext.login import UserMixin
from marshmallow import Schema, fields
from sqlalchemy import func


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

# class Task(db.Model):
#     taskId = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     title = db.Column(db.String(255))
#     userId = db.Column(db.Integer, db.ForeignKey('user.id'))
#     timestamp = db.Column(db.DateTime)
#     ## Assigned IDs is going to need attention
#     assignedIds = db.Column(db.Integer)
#     status = db.Column(db.String(255), default="New")
#     description = db.Column(db.String(255))
#     duedate = db.Column(db.DateTime)
#     orderId = db.Column(db.Integer)
#     user = db.relationship('User',
#         backref=db.backref('tasks', lazy='dynamic'))

class Task(db.Model):
    taskId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255))
    status = db.Column(db.String(255), default="New")
    # userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    # timestamp = db.Column(db.DateTime)


    def __init__(self, title, status):
        self.title = title
        self.status = status

class TaskSchema(Schema):
    class Meta:
        fields = ('title', 'status')

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    taskId = db.Column(db.Integer, db.ForeignKey('task.taskId'))
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    text = db.Column(db.String(255), nullable=False)
    task = db.relationship('Task',
        backref=db.backref('comments', lazy='dynamic'))

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    taskId = db.Column(db.Integer, db.ForeignKey('task.taskId'))
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    text = db.Column(db.String(255), nullable=False)
    task = db.relationship('Task',
        backref=db.backref('todos', lazy='dynamic'))
