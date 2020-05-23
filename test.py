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

    def test_create_user_fail(self):
        u = User(username='bob', email='bob@b.c')
        self.assertFalse(u.username == 'tom')
        self.assertFalse(u.email == 'tom@b.c')

    def test_create_note(self):
        n = Note(content='a', user_id='a')
        self.assertEqual(n.content, 'a')
        self.assertEqual(n.user_id, 'a')

    def test_create_note_fail(self):
        n = Note(content='a', user_id='a')
        self.assertFalse(n.content == 'b')
        self.assertFalse(n.user_id == 'b')

    def test_create_todo(self):
        t = ThingToDo(content='test', user_id='test')
        self.assertEqual(t.content, 'test')
        self.assertEqual(t.user_id, 'test')

    def test_create_todo_fail(self):
        t = ThingToDo(content='test', user_id='test')
        self.assertFalse(t.content == 'bob')
        self.assertFalse(t.user_id == 'bob')


if __name__ == "__main__":
    unittest.main()