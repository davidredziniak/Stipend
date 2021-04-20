# Flask and create-react-app

## Requirements
1. `npm install`
2. `pip install -r requirements.txt`
3. `npm i react-google-login`
4. `npm i node-fetch`
5. `npm install react-router-dom`
6. `npm install react-hook-form`
7. `npm install --save moment react-moment`
8. `npm install --save moment-timezone`

## Setup
1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## Run Application
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'
 
## Deploy to Heroku
*Don't do the Heroku step for assignments, you only need to deploy for Project 2*
1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push heroku main`

## Dependencies
1. npm i node-fetch
2. npm install react-router-dom
