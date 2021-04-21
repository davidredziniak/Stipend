import unittest
from app import get_email_from_token_id

KEY_SESSIONS = 'sessions'
KEY_TOKEN_ID = 'token_id'
KEY_EXPECTED = 'expected'

EMAIL_1 = 'bob@gmail.com'
EMAIL_2 = 'joe@gmail.com'
TOKEN_ID_1 = 'sfsdfsf3afda2'
TOKEN_ID_2 = 'cxii53dfsad52'

class GetEmailFromTokenTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [{
            KEY_SESSIONS: {
                EMAIL_1: TOKEN_ID_1,
            },
            KEY_TOKEN_ID: TOKEN_ID_1,
            KEY_EXPECTED: [EMAIL_1],
        }, {
            KEY_SESSIONS: {
                EMAIL_2: TOKEN_ID_2,
            },
            KEY_TOKEN_ID: TOKEN_ID_1,
            KEY_EXPECTED: [],
        }]
        self.failure_test_params = [{
            KEY_SESSIONS: {
                EMAIL_1: TOKEN_ID_1,
            },
            KEY_TOKEN_ID: TOKEN_ID_2,
            KEY_EXPECTED: [EMAIL_1],
        }, {
            KEY_SESSIONS: {
                EMAIL_1: TOKEN_ID_1,
                EMAIL_2: TOKEN_ID_2,
            },
            KEY_TOKEN_ID: TOKEN_ID_1,
            KEY_EXPECTED: [],
        }]
    def test_success(self):
        for test in self.success_test_params:
            sessions = test[KEY_SESSIONS]
            token_id = test[KEY_TOKEN_ID]

            actual_result = get_email_from_token_id(sessions, token_id)
            expected_result = test[KEY_EXPECTED]

            self.assertEqual(len(actual_result), len(expected_result))
            self.assertEqual(actual_result, expected_result)
    def test_failure(self):
        for test in self.failure_test_params:
            sessions = test[KEY_SESSIONS]
            token_id = test[KEY_TOKEN_ID]

            actual_result = get_email_from_token_id(sessions, token_id)
            expected_result = test[KEY_EXPECTED]

            self.assertNotEqual(len(actual_result), len(expected_result))
            self.assertNotEqual(actual_result, expected_result)

if __name__ == '__main__':
    unittest.main()
