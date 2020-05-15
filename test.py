import unittest
from app import app

class TestAskMe(unittest.TestCase):
    
    def setUp(self):
        app.testing = True
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


if __name__ == "__main__":
    unittest.main()