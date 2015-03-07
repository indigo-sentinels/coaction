from flask_wtf import Form
from wtforms import StringField, PasswordField
from wtforms.fields.html5 import IntegerField, DateField, EmailField
from wtforms.validators import DataRequired, EqualTo, Email

class APIForm(Form):
  def __init__(self, *args, **kwargs):
      default_kwargs = {"formdata": None, "csrf_enabled": False}
      default_kwargs.update(kwargs)
      super().__init__(*args, **default_kwargs)

class TaskForm(Form):
    title = StringField('title', validators=[DataRequired()])
    status = StringField('status', default="New")
    description = StringField('Description')
    duedate = DateField('Date')
    assignedIds = IntegerField("assignedIds")
    orderId = IntegerField('orderId')
    comments = StringField("comment", default=None)


class CommentForm(Form):
    taskId = IntegerField("taskId")
    text = StringField("text", validators=[DataRequired()])


class TodoForm(Form):
    taskId = IntegerField("taskId")
    text = StringField("text", validators=[DataRequired()])
    status = StringField("status", default="New")


class RegistrationForm(APIForm):
    name = StringField('Name', validators=[DataRequired()])
    email = EmailField('Email', validators=[DataRequired(), Email()])
    password = StringField(
        'Password',
        validators=[DataRequired()])


class LoginForm(APIForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])

