from flask import Flask

from . import models
from .extensions import db, migrate, config, login_manager
from .views.views import coaction
from .views.home import home
from .views.user import user


SQLALCHEMY_DATABASE_URI = "postgres://localhost/coaction"
DEBUG = True
SECRET_KEY = 'development-key'


def create_app():
    app = Flask(__name__)
    app.config.from_object(__name__)
    app.register_blueprint(home)
    app.register_blueprint(user, url_prefix='/api')
    app.register_blueprint(coaction, url_prefix='/api')

    config.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    login_manager.init_app(app)

    return app
