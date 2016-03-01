from memoboard import create_app, db

from flask.ext.testing import TestCase


class MyTest(TestCase):

    def create_app(self):
        app = create_app('tests.config')

        return app

    def setUp(self):
        """
        Creates a database and fills it with sufficient dummy data to run the tests.
        """
        db.create_all()

    def tearDown(self):
        """
        Removes test database again, so the next test can start with a clean slate
        """
        db.session.remove()
        db.drop_all()

    def test_main(self):
        # check if route returns code 200
        response = self.client.get('/')
        self.assert_template_used('index.html')
        self.assert200(response)