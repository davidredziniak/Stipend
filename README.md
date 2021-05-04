# Link to APP Sprint1:- https://stipend.herokuapp.com/
# Link to APP Sprint2:- https://stipend-v2.herokuapp.com/#/

# Flask and create-react-app

## Requirements
1. `npm install`
2. `pip install -r requirements.txt`


## Setup
1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory
2. In the .env file, have REACT_APP_CLIENT_ID=<user's google client-id> saved which can be found from https://cloud.google.com/.
3. In the .env file, have DATABASE_URL='<your heroku config link>' saved.

## Run Application
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Setup google account for sending emails:
    * https://www.google.com/settings/security/lesssecureapps
    * Visit this link and press Enable
    * In the main directory with app.py, add these these lines to .env
    * G_EMAIL='(your gmail email address)'
    * G_EMAIL_PASS='(Your gmail password)'
 
## Dependencies
1. "@testing-library/jest-dom": "^5.11.9"
2. "@testing-library/react": "^11.2.5",
3. "@testing-library/user-event": "^12.6.3",
4. "dotenv": "^8.2.0",
5. "node-fetch": "^2.6.1",
6. "prettier": "^2.2.1",
7. "react": "^17.0.1",
8. "react-dom": "^17.0.1",
9. "react-google-login": "^5.2.2",
10. "react-hook-form": "^7.1.1",
11. "react-multi-email": "^0.5.3",
12. "react-random-code-generator": "^1.0.2",
13. "react-router-dom": "^5.2.0",
14. "react-scripts": "4.0.2",
15. "socket.io-client": "^3.1.1",
16.  "web-vitals": "^1.1.0"

## Linting ignores and their reasons
1. R0903 - allowed in proj2
2. E1101 - scoped session errors
3. W0611 - says unused import app, but app is definitely used
4. C0413 - messed around with the positioning of import statement but ultimately it conflicted with other pylint codes
5. E0401 - on unit tests was showing unable to import app, but importing app was successful
6. R0401 - for now, have to use cyclic import because unit tests weren't cooperating
7. R0913 - Says too many arguments passed
8. R0914 - too many local local variables
9. R0911 - too many return statements
10. R0912 - too many branches
11. R1705 - unnecessary else after return
