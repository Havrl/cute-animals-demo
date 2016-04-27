/* Exports a function which returns an object that overrides the default &
 *   plugin file patterns (used widely through the app configuration)
 *
 * To see the default definitions for Lineman's file paths and globs, see:
 *
 *   - https://github.com/linemanjs/lineman/blob/master/config/files.coffee
 */
module.exports = function(lineman) {
  //Override file patterns here
  return {
    js: {
      vendor: [
        "vendor/js/jquery.js",
        "vendor/js/angular.js",
        "vendor/js/bootstrap.js",
        "vendor/js/**/*.js"
      ],
      app: [
        "app/js/**/*.module.js",
        "app/js/**/*.js"
      ]
    },

    less: {
      compile: {
        options: {
          paths: ["app/css/**/*.less", "vendor/css/**/*.css"]
        }
      }
    }
  };
};
