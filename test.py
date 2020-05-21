import unittest
from app import app
from app.models import User, ThingToDo, Note
import os
basedir = os.path.abspath(os.path.dirname(__file__))

class TestAskMe(unittest.TestCase):

    def setUp(self):
        app.testing = True
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'test.db')
        self.app = app.test_client(self)

    def tearDown(self):
        pass

    def test_page(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)

    def test_login(self):
        response = self.app.get('/login', content_type='html/text')
        self.assertEqual(response.status_code, 200)

    def test_register(self):
        response = self.app.get('/register')
        self.assertEqual(response.status_code, 200)

    def test_notes(self):
        response = self.app.get('/notes')
        self.assertEqual(response.status_code, 302)

    def test_todo(self):
        response = self.app.get('/things-to-do')
        self.assertEqual(response.status_code, 302)

    def test_about(self):
        response = self.app.get('/about')
        self.assertEqual(response.status_code, 200)

    def test_favicon(self):
        response = self.app.get('/favicon.ico')
        self.assertEqual(response.status_code, 200)
    
    def test_create_user(self):
        u = User(username='jake', email='i@b.c')
        self.assertEqual(u.username, 'jake')
        self.assertEqual(u.email, 'i@b.c')
    
    def test_create_note(self):
        n = Note(content='a',user_id='a')
        self.assertEqual(n.content, 'a')
        self.assertEqual(n.user_id, 'a')

if __name__ == "__main__":
    unittest.main()