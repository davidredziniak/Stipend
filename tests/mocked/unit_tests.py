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
from app import DB, models, add_user_to_database, add_trip_to_database



KEY_INPUT = "input"
KEY_EXPECTED = "expected"

INTIAL_USER = {'email': 'alreadyin@gmail.com', 'first_name': 'Already', 'last_name': 'In'}
INITIAL_TRIP = {'trip_name': 'Miami 2020', 'owner_id': 3, 'join_code': '39d9d9s'}

class AddUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: {'email': 'dave1@gmail.com', 'first_name':'Dave', 'last_name': 'Red'},
                KEY_EXPECTED: [INTIAL_USER['email'], 'dave1@gmail.com'],
            },
            {
                KEY_INPUT: {'email': 'ron@gmail.com', 'first_name':'Ron', 'last_name': 'Jelly'},
                KEY_EXPECTED: [INTIAL_USER['email'], 'dave1@gmail.com', 'ron@gmail.com'],
            },
            {
                KEY_INPUT: {'email': 'luicy3@gmail.com', 'first_name':'Lucy', 'last_name': 'Tess'},
                KEY_EXPECTED: [INTIAL_USER['email'], 'dave1@gmail.com', 'ron@gmail.com', 'luicy3@gmail.com'],
            }
        ]
        
        initial_user = models.User(email=INTIAL_USER['email'], first_name=INTIAL_USER['first_name'], last_name=INTIAL_USER['last_name'])
        self.initial_db_mock = [initial_user]
    
    def mocked_db_session_add(self, email):
        self.initial_db_mock.append(email)
    
    def mocked_db_session_commit(self):
        pass
    
    def mocked_user_query_all(self):
        return self.initial_db_mock

    def test_success(self):
        for test in self.success_test_params:
            with patch('app.DB.session.add', self.mocked_db_session_add):
                with patch('app.DB.session.commit', self.mocked_db_session_commit):
                    with patch('models.User.query') as mocked_query:
                        mocked_query.all = self.mocked_user_query_all
                        actual_result = add_user_to_database(test[KEY_INPUT]['email'], test[KEY_INPUT]['first_name'], test[KEY_INPUT]['last_name'])
                        expected_result = test[KEY_EXPECTED]
                        self.assertEqual(len(actual_result), len(expected_result))
                        self.assertEqual(actual_result[-1], expected_result[-1])

class AddTripTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: {'trip_name':'Mexico 2021', 'owner_id': 1, 'join_code': 'fd8238d'},
                KEY_EXPECTED: [INITIAL_TRIP['trip_name'], 'Mexico 2021'],
            },
            {
                KEY_INPUT: {'trip_name':'Lollapalooza 2021', 'owner_id': 56, 'join_code': 'g3878fd'},
                KEY_EXPECTED: [INITIAL_TRIP['trip_name'], 'Mexico 2021', 'Lollapalooza 2021'],
            },
            {
                KEY_INPUT: {'trip_name':'Namans wedding', 'owner_id': 2, 'join_code': '8678d665yy'},
                KEY_EXPECTED: [INITIAL_TRIP['trip_name'], 'Mexico 2021', 'Lollapalooza 2021'],
            }
        ]
        
        initial_tripp = models.Trip(trip_name=INITIAL_TRIP['trip_name'],
                           join_code=INITIAL_TRIP['join_code'],
                           owner_id=INITIAL_TRIP['owner_id'])
        self.initial_db_mock = [initial_tripp]
    
    def mocked_db_session_add(self, trip_name):
        self.initial_db_mock.append(trip_name)
    
    def mocked_db_session_commit(self):
        pass
    
    def mocked_trip_query_all(self):
        return self.initial_db_mock

    def test_success(self):
        for test in self.success_test_params:
            with patch('app.DB.session.add', self.mocked_db_session_add):
                with patch('app.DB.session.commit', self.mocked_db_session_commit):
                    with patch('models.Trip.query') as mocked_query:
                        mocked_query.all = self.mocked_trip_query_all
                        actual_result = add_trip_to_database(test[KEY_INPUT]['trip_name'], test[KEY_INPUT]['join_code'], test[KEY_INPUT]['owner_id'])
                        expected_result = test[KEY_EXPECTED]
                        self.assertEqual(len(actual_result), len(expected_result))
                        self.assertEqual(actual_result[-1], expected_result[-1])

if __name__ == '__main__':
    unittest.main()
