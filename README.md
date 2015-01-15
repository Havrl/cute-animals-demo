lineman-angular-boilerplate
===========================

A kickstarter for web development projects. The goal is to have everything you need to get started out of the box.

# Instructions
1. `$ git clone git@github.com:Havrl/lineman-angular-boilerplate.git my-web-app`
2. `$ cd my-web-app`
3. `$ sudo npm install -g lineman`
4. `$ sudo npm install -g bower`
5. `$ npm install`

Note: lineman.js contains the outdated grunt-contrib-jshint which will produce the hint errors.
To update it:
1. Open the node_modules/lineman/package.json
2. Update the version of `grunt-contrib-jshint` to `0.10.0`
3. Run `npm update` in the root of the project, e.g. actionfinish

Also:
ngAnnotate module runs only during dist task. The ng-strict-di attribute will issue the errors
To enable the ngAnnotate add the following line to node_modules/lineman-angular/config/plugins/ngannotate.coffee in the prependTasks:
`dev: lineman.config.application.prependTasks.dev.concat("ngAnnotate")`
and the `ngAnnotate` to the node_modules/lineman/config/plugins/watch.coffee in js like one below:
`js:
        files: ["<%= files.js.vendor %>", "<%= files.js.app %>"]
        tasks: ["concat_sourcemap:js", "ngAnnotate"]
`

Also:
jQuery.js is not going to be included into the prod build, but it is required in unit / e2e tests.
So we are using grunt-strip-code task to strip the jQuery.js code from prod bundle build.
But the grunt-strip-code plugin is outdated. Below is the steps to make it working:
1. Open the vendor/jquery.js file and surround its content with two comment lines:
  `/* test-code */`
  ` ... jquery.js code ...`
  `/* end-test-code */`
2. Open `node_modules/grunt-strip-code/tasks/strip_code.js` and comment out the if(f.dest) statement at the very bottom,
  while the else statement should run:

  `if (contents != replacement) {
    /*if (f.dest) {
      grunt.file.write(filepath, replacement);
      grunt.log.writeln("Stripped code from " + filepath + " and saved to " + f.dest);
    } else*/ {
      grunt.file.write(filepath, replacement);
      grunt.log.writeln("Stripped code from " + filepath);
    }
  }`


# Running in development mode
1. `$ lineman grunt replace:staging`
2. `$ lineman run`
3. Open your browser to localhost:8000
Note: the first command with grunt replace will inject the env.config.js file into app folder.

# Running in production mode
1. `$ lineman grunt replace:production`
2. `$ lineman build`
3. Zip the dist folder and upload it to AWS Elastic Beanstalk

# Running Tests

This template was used as the basis of [@davemo](http://www.github.com/davemo)'s [Testing Strategies for Angular JS](http://www.youtube.com/watch?v=UYVcY9EJcRs) screencast, and contains all the tests we wrote in the screencast and a few more!

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
