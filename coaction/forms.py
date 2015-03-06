from flask_wtf import Form
from wtforms import StringField
from wtforms.fields.html5 import IntegerField, DateField
from wtforms.validators import DataRequired, AnyOf

class TaskForm(Form):
    title = StringField('title')
    status = StringField('status', default="New")
    # description = StringField('Description')
    # due_date = DateField('Date')
    # assigned_ids = IntegerField("assigned_ids")
    # order_id = IntegerField('orderId')


