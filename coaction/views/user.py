import base64
from flask import Blueprint, request
from flask.ext.login import login_user, current_user, abort
from ..models import User
from ..extensions import db, login_manager



@login_manager.request_loader
def authorize_user(request):
    # Authorization: Basic username:password
    api_key = request.headers.get('Authorization')
    if api_key:
        api_key = api_key.replace('Basic ', '', 1)
        api_key = base64.b64decode(api_key).decode("utf-8")
        email, password = api_key.split(":")

        user = User.query.filter_by(email=email).first()
        if user.check_password(password):
            return user
    return None

def require_authorization():
    user = authorize_user(request)
    if user:
        login_user(user)
    else:
        abort(401)





