import base64
from flask import Blueprint, request
from flask.ext.login import current_user, abort, login_user, logout_user
from ..models import User, UserSchema
from ..extensions import db, login_manager
from ..api_helpers import APIView, returns_json
from ..forms import RegistrationForm, LoginForm

user = Blueprint("user", __name__, static_folder="./static")

@user.app_errorhandler(401)
@returns_json
def unauthorized(request):
    return {"error": "This API call requires authentication."}, 401


@login_manager.request_loader
def authorize_user(request):
    authorization = request.authorization
    if authorization:
        email = authorization['username']
        password = authorization['password']
        user = User.query.filter_by(email=email).first()
        if user.check_password(password):
            return user

    return None


def require_authorization():
    if not current_user.is_authenticated():
        abort(401)


class UserView(APIView):
    def get(self):
        users = User.query.all()
        if users:
            serializer = UserSchema(many=True)
            result = serializer.dump(users)
            return {"users": result.data}
        else:
            return {"error": "no users!"}


class Register(APIView):
    def post(self):
        data = request.get_json()
        form = RegistrationForm(data=data, formdata=None, csrf_enabled=False)
        if form.validate_on_submit():
            user = User.query.filter_by(email=form.email.data).first()
            if user:
                return {"error": "A user with that email address already exists."}
            else:
                user = User(name=form.name.data,
                            email=form.email.data,
                            password=form.password.data)
                db.session.add(user)
                db.session.commit()
                login_user(user)
                return {"message": "You have been registered and logged in"}
        else:
            return {"error": "Form not validated"}


class Login(APIView):
    def post(self):
        data = request.get_json()
        form = LoginForm(data=data, formdata=None, csrf_enabled=False)
        if form.validate_on_submit():
            user = User.query.filter_by(email=form.email.data).first()
            if user and user.check_password(form.password.data):
                login_user(user)
                return {"result": "success"}
            else:
                return {"result": "password failure"}
        else:
            return {"result": "form failure"}


class Logout(APIView):
    def post(self):
        logout_user()
        return {"result": "logged out"}


user.add_url_rule('/users/', view_func=UserView.as_view('user'))
user.add_url_rule('/login/', view_func=Login.as_view('login'))
user.add_url_rule('/register/', view_func=Register.as_view('register'))
user.add_url_rule('/logout/', view_func=Logout.as_view('logout'))


