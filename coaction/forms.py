from flask_wtf import Form
from wtforms import StringField
from wtforms.fields.html5 import IntegerField, DateField
from wtforms.validators import DataRequired, AnyOf

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

