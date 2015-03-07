pip3 install -r requirements.txt
rm -rf migrations
rm /tmp/coaction.db
python3 manage.py db init
python3 manage.py db migrate
python3 manage.py db upgrade
python3 manage.py seed
