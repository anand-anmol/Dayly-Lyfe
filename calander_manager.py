from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from base import Base
from flask import g


class CalanderManager:

    def __init__(self, calander_db):
        """ Creates a Song object and map to the Database """

        if calander_db is None or calander_db == "":
            raise ValueError(f"Song database [{calander_db}] not found")

        engine = create_engine('sqlite:///' + calander_db)
        Base.metadata.bind = engine
        self._db_session = sessionmaker(bind=engine)


    def get_db():
        db = getattr(g, '_database', None)
        if db is None:
            db = g._database = sqlite3.connect(ca)
        return db


    @app.teardown_appcontext
    def close_connection(self, exception):
        db = getattr(g, '_database', None)
        if db is not None:
            db.close()


    def query_db(self, query, args=(), one=False):
        cur = get_db().execute(query, args)
        rv = cur.fetchall()
        cur.close()
        return (rv[0] if rv else None) if one else rv


    def valid_login(self, username, password):
        user = query_db('select * from User where username = ? and password = ?', [username, password], one=True)
        if user is None:
            return False
        else:
            return True


    def log_the_user_in(self, username):
        return render_template('profile.html', username=username)