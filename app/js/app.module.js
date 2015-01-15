/**
 * @name app.module.js
 * @desc Application root module which pulls together all of the modules
 * and features of the application
 */
(function() {
  'use strict';

  angular.module('app', [
    /*
     * Order is not important. Angular makes a
     * pass to register all of the modules listed
     * and then when app.dashboard tries to use app.data,
     * it's components are available.
     */

    /*
     * Everybody has access to these.
     * We could place these under every feature area,
     * but this is easier to maintain.
     */
    'app.core',
    'app.widgets',

    /*
     * Feature areas
     */
    'app.layout',
    'app.identity'
  ]);

})();