/* Exports a function which returns an object that overrides the default &
 *   plugin grunt configuration object.
 *
 * You can familiarize yourself with Lineman's defaults by checking out:
 *
 *   - https://github.com/linemanjs/lineman/blob/master/config/application.coffee
 *   - https://github.com/linemanjs/lineman/blob/master/config/plugins
 *
 * You can also ask Lineman's about config from the command line:
 *
 *   $ lineman config #=> to print the entire config
 *   $ lineman config concat.js #=> to see the JS config for the concat task.
 */
module.exports = function(lineman) {
  //Override application configuration here. Common examples follow in the comments.
  return {

    // JSHint config
    // Note: it is possible to use .jshintrc file instead,
    // see: https://github.com/linemanjs/lineman/issues/269
    jshint: {
      options: {
        "bitwise": true,
        "camelcase": false,
        "curly": true,
        "eqeqeq": true,
        "es3": false,
        "forin": true,
        "freeze": true,
        "immed": true,
        "indent": 2,
        "latedef": "nofunc",
        "newcap": true,
        "noarg": true,
        "noempty": true,
        "nonbsp": true,
        "nonew": true,
        "plusplus": false,
        "quotmark": "single",
        "undef": true,
        "unused": false,
        "strict": false,
        "maxparams": 12,
        "maxdepth": 5,
        "maxstatements": 80,
        "maxcomplexity": 8,
        "maxlen": 120,
        "asi": false,
        "boss": false,
        "debug": false,
        "eqnull": true,
        "esnext": false,
        "evil": false,
        "expr": false,
        "funcscope": false,
        "globalstrict": false,
        "iterator": false,
        "lastsemic": false,
        "laxbreak": false,
        "laxcomma": false,
        "loopfunc": true,
        "maxerr": false,
        "moz": false,
        "multistr": false,
        "notypeof": false,
        "proto": false,
        "scripturl": false,
        "shadow": false,
        "sub": true,
        "supernew": false,
        "validthis": false,
        "noyield": false,
        "browser": true,
        "node": true,
        "globals": {
          "angular": false,
          "$": false,
          "_": false
        }
      }
    },

    // grunt-angular-templates assumes your module is named "app", but
    // you can override it like so:
    ngtemplates:  {
      app: {
        options: {
          module: "app",
          base: "app/js",
          prefix: "/",
          htmlmin: {
            collapseBooleanAttributes:      false,
            collapseWhitespace:             true,
            removeAttributeQuotes:          false,
            removeComments:                 true, // Only if you don't use comment directives!
            removeEmptyAttributes:          false,
            removeRedundantAttributes:      false,
            removeScriptTypeAttributes:     true,
            removeStyleLinkTypeAttributes:  true
          }
        },
        src: "app/js/**/*.html"
      }
    },

    watch: {
      ngtemplates: {
        files: "app/js/**/*.html"
      }
    },

    server: {
      pushState: true
      // API Proxying
      //
      // During development, you'll likely want to make XHR (AJAX) requests to an API on the same
      // port as your lineman development server. By enabling the API proxy and setting the port, all
      // requests for paths that don't match a static asset in ./generated will be forwarded to
      // whatever service might be running on the specified port.
      //
      // apiProxy: {
      //   enabled: true,
      //   host: 'localhost',
      //   port: 3000
      // }
    },

    // Sass
    //
    // Lineman supports Sass via grunt-contrib-sass, which requires you first
    // have Ruby installed as well as the `sass` gem. To enable it, comment out the
    // following line:
    //
    // enableSass: true

    // Asset Fingerprints
    //
    // Lineman can fingerprint your static assets by appending a hash to the filename
    // and logging a manifest of logical-to-hashed filenames in dist/assets.json
    // via grunt-asset-fingerprint
    //
    enableAssetFingerprint: true,

    // LiveReload
    //
    // Lineman can LiveReload browsers whenever a file is changed that results in
    // assets to be processed, preventing the need to hit F5/Cmd-R every time you
    // make a change in each browser you're working against. To enable LiveReload,
    // comment out the following line:
    //
    livereload: true,

    appendTasks: {
      dist: ["copy:server"]
    }

  };
};
