from flask_wtf import Form
from wtforms import StringField, PasswordField
from wtforms.fields.html5 import IntegerField, DateField, EmailField
from wtforms.validators import DataRequired, EqualTo, Email


class TaskForm(Form):
    title = StringField('title', validators=[DataRequired()])
    status = StringField('status', default="New")
    description = StringField('Description')
    duedate = DateField('Date')
    assignedIds = IntegerField("assignedIds")
    orderId = IntegerField('orderId')
    comments = StringField("comment", default=None)
    todos = StringField("todo", default=None)
    listId = IntegerField('listId')


class CommentForm(Form):
    taskId = IntegerField("taskId")
    text = StringField("text", validators=[DataRequired()])


class TodoForm(Form):
    taskId = IntegerField("taskId")
    text = StringField("text", validators=[DataRequired()])
    status = StringField("status", default="New")


class RegistrationForm(Form):
    name = StringField('Name', validators=[DataRequired()])
    email = EmailField('Email', validators=[DataRequired()])
    password = StringField(
        'Password',
        validators=[DataRequired()])


class LoginForm(Form):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
