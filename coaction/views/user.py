import base64
from flask import Blueprint, request
from flask.ext.login import current_user, abort, login_user, logout_user, login_required
from ..models import User, UserSchema, Task, TaskSchema
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


class UserListView(APIView):
    # @login_required
    def get(self):
        users = User.query.all()
        if users:
            serializer = UserSchema(many=True)
            result = serializer.dump(users)
            return {"users": result.data}
        else:
            return {"error": "no users!"}


class UserView(APIView):
    # @login_required
    def get(self, id):
        user = User.query.get(id)
        if user:
            serializer = UserSchema()
            result = serializer.dump(user)
            return result.data
        else:
            return {"error": "user not found"}



class Register(APIView):
    def post(self):
        data = request.get_json()
        form = RegistrationForm(data=data, formdata=None, csrf_enabled=False)
        if form.validate_on_submit():
            print("validate")
            user = User.query.filter_by(email=form.email.data).first()
            if user:
                return {"error": "A user with that email address already exists."}
            else:
                print("else")
                user = User(name=form.name.data,
                            email=form.email.data,
                            password=form.password.data)
                print(user)
                print(user.password)
                print(user.encryptedPassword)
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
    # @login_required
    def post(self):
        logout_user()
        return {"result": "logged out"}


class UserTasks(APIView):
    # @login_required
    def get(self, id):
        if current_user.id == id:
            tasks = Task.query.filter_by(userId = id)
            serializer = TaskSchema(many=True)
            result = serializer.dump(tasks)
            return {"tasks": result.data}
        else:
            return {"error":"not authorized"}


user.add_url_rule('/users/', view_func=UserListView.as_view('users'))
user.add_url_rule('/login/', view_func=Login.as_view('login'))
user.add_url_rule('/register/', view_func=Register.as_view('register'))
user.add_url_rule('/logout/', view_func=Logout.as_view('logout'))
user.add_url_rule('/users/<int:id>/', view_func=UserView.as_view('user'))
user.add_url_rule('/users/<int:id>/tasks', view_func=UserTasks.as_view('usertasks'))
