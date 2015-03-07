#!/usr/bin/env python
import os
from flask.ext.script import Manager, Shell, Server
from flask.ext.migrate import MigrateCommand
from flask.ext.script.commands import ShowUrls, Clean
from coaction.models import Task, Comment, User

from coaction import create_app, db
import datetime as dt


app = create_app()
manager = Manager(app)
manager.add_command('server', Server())
manager.add_command('db', MigrateCommand)
manager.add_command('show-urls', ShowUrls())
manager.add_command('clean', Clean())


@manager.shell
def make_shell_context():
    """ Creates a python REPL with several default imports
        in the context of the app
    """

    return dict(app=app, db=db)


@manager.command
def createdb():
    """Creates the database with all model tables.
    Migrations are preferred."""
    db.create_all()

@manager.command
def seed():
    """Seed first user with tasks"""
    task_seed_data = [{
                  'title':"Go Shopping",
                  'status': "New",
                #   'userId': 1,
                  'duedate': "2015/3/15",
                  'timestamp': "2015/3/6",
                  'description': "Do some shopping",
                  'orderId': "1",
                  'assignedIds': '1',
                  'comments': "comment",
                  'todos': "todo1"
                  },
                  {
                  'title':"Do something else",
                   'status': "New",
                #    'userId': 1,
                   'timestamp': "2015/3/6",
                   'duedate': "2015/4/25",
                   'description': "A new thing to do",
                   'orderId': "2",
                   'assignedIds': '2',
                   'comments': "comment2",
                   'todos': "todo2"
                   }]
    comment_seed_data = [{
                    'text': "what a cool task",
                    'taskId': "1"
                    # 'userId': "1"
                    }]

    for seed in task_seed_data:
        task=Task(title=seed['title'],
               status=seed['status'],
            #    userId=seed['userId'],
               duedate=seed['duedate'],
               description=seed['description'],
               orderId=seed['orderId'],
               assignedIds=seed['assignedIds'],
               comments=seed['comments'],
               todos=seed['todos'])

        db.session.add(task)
    for seed in comment_seed_data:
        comment=Comment(text=seed['text'],
                        taskId=seed['taskId']
                        # userId=seed['userId']
                        )
        db.session.add(comment)
    db.session.commit()
    print("{} tasks added.".format(len(task_seed_data)))

if __name__ == '__main__':
    manager.run()
