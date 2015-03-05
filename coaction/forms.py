from flask_wtf import Form
from wtforms import StringField
from wtforms.fields.html5 import IntegerField, DateField
from wtforms.validators import DataRequired, AnyOf

class TaskForm(Form):
    title = StringField('Title', validators=[DataRequired()])
    timestamp = DateField('Date', validators=[DataRequired()])
    status = StringField('Status', validators=[AnyOf("Started", "New", "Done")])
    description = StringField('Description')
    due_date = DateField('Date')
    assigned_ids = IntegerField("assigned_ids")


