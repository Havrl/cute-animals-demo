Cute animals SPA demo
===========================

Build with Angular.js using lineman.js following Angular style guide: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md

# Live Demo
http://cute-animals.herokuapp.com/

# Instructions
1. `$ git clone git@github.com:Havrl/cute-animals-demo.git my-app`
2. `$ cd my-app`
3. `$ sudo npm install -g lineman`
5. `$ npm install`

# Running in development mode
1. `$ lineman run`
2. Open your browser to localhost:8000

# Running in production mode
1. `$ lineman build`
2. dist folder will contain the production build, which can be moved into any web server
Or:
3. `$ cd dist`
4. Run `node server.js`
5. Open your browser to localhost:8888

# Deploy on Heroku
1. `$ heroku config:set BUILDPACK_URL=https://github.com/heroku/heroku-buildpack-nodejs`
   `$ heroku config:set NPM_CONFIG_PRODUCTION=false`
2. `$ git push heroku master`


# Running Tests (no tests available for this demo)

To run the unit tests:

1. `lineman run` from 1 terminal window
2. `lineman spec` from another terminal window, this will launch Testem and execute specs in Chrome

To run the end-to-end tests:

1. `npm install protractor`
2. `./node_modules/protractor/bin/webdriver-manager update`
3. Make sure you have chrome installed.
4. `lineman run` from 1 terminal window
5. `lineman grunt spec-e2e` from another terminal window

  Troubleshooting:

    If you see this error: Warning: there's no selenium server jar at the specified location,
    you may need to change the selenium-server-standalone jar version in config/spec-e2e.js
    to the actual you see in /node_modules/protractor/selenium/selenium-server-standalone-2.44.0.
