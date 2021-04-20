'''
    unit_tests.py
    
    Fill in what this test is for here
'''

import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys
sys.path.append(os.path.abspath('../../'))
import app
from app import User, DB, add_user_to_database, add_trip_to_database



KEY_INPUT = "input"
KEY_EXPECTED = "expected"

INTIAL_USER = {'email': 'alreadyin@gmail.com', 'first_name': 'Already', 'last_name': 'In'}

class AddUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: {'email': 'dave1@gmail.com', 'first_name':'Dave', 'last_name': 'Red'},
                KEY_EXPECTED: [INTIAL_USER['email'], 'dave@gmail.com'],
            },
            {
                KEY_INPUT: {'email': 'ron@gmail.com', 'first_name':'Ron', 'last_name': 'Jelly'},
                KEY_EXPECTED: [INTIAL_USER['email'], 'dave@gmail.com', 'ron@gmail.com'],
            },
            {
                KEY_INPUT: {'email': 'luicy3@gmail.com', 'first_name':'Lucy', 'last_name': 'Tess'},
                KEY_EXPECTED: [INTIAL_USER['email'], 'dave@gmail.com', 'ron@gmail.com', 'luicy3@gmail.com'],
            }
        ]
        
        initial_user = User(email=INTIAL_USER['email'], first_name=INTIAL_USER['first_name'], last_name=INTIAL_USER['last_name'])
        self.initial_db_mock = [initial_user]
    
    def mocked_db_session_add(self, email):
        self.initial_db_mock.append(email)
    
    def mocked_db_session_commit(self):
        pass
    
    def mocked_person_query_all(self):
        return self.initial_db_mock

    def test_success(self):
        for test in self.success_test_params:
            with patch('app.DB.session.add', self.mocked_db_session_add):
                with patch('app.DB.session.commit', self.mocked_db_session_commit):
                    with patch('User.query') as mocked_query:
                        mocked_query.all = self.mocked_person_query_all
                        actual_result = add_user_to_database(test[KEY_INPUT])
                        expected_result = test[KEY_EXPECTED]
                        self.assertEqual(len(actual_result), len(expected_result))
                        self.assertEqual(actual_result[-1], expected_result[-1])

if __name__ == '__main__':
    unittest.main()
