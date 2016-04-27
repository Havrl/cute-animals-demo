// Include in index.html so that app level exceptions are handled.
// Exclude from testRunner.html which should run exactly what it wants to run
(function() {
  'use strict';

  angular
      .module('blocks.exception')
      .provider('exceptionConfig', exceptionConfigProvider)
      .config(exceptionConfig);

  /**
   * Must configure the exception handling
   * @return {[type]}
   */
  function exceptionConfigProvider() {
    /* jshint validthis:true */
    this.config = {
      appErrorPrefix: undefined
    };

    this.configure = function (appErrorPrefix) {
      this.config.appErrorPrefix = appErrorPrefix;
    };

    this.$get = function() {
      return {config: this.config};
    };
  }

  exceptionConfig.$inject = ['$provide'];

  /**
   * Configure by setting an optional string value for appErrorPrefix.
   * Accessible via config.appErrorPrefix (via config value).
   * @param  {[type]} $provide
   * @return {[type]}
   * @ngInject
   */
  function exceptionConfig($provide) {
    $provide.decorator('$exceptionHandler', extendExceptionHandler);
  }

  extendExceptionHandler.$inject = ['$delegate', 'exceptionConfig', 'logger'];

  /**
   * Extend the $exceptionHandler service to also display a toast.
   * @param  {Object} $delegate
   * @param  {Object} exceptionHandler
   * @param  {Object} logger
   * @return {Function} the decorated $exceptionHandler service
   */
  function extendExceptionHandler($delegate, exceptionConfig, logger) {
    return function(exception, cause) {
      var appErrorPrefix = exceptionConfig.config.appErrorPrefix || '';
      var errorData = {exception: exception, cause: cause};
      exception.message = appErrorPrefix + exception.message;
      $delegate(exception, cause);
      /**
       * Could add the error to a service's collection,
       * add errors to $rootScope, log errors to remote web server,
       * or log locally. Or throw hard. It is entirely up to you.
       * throw exception;
       *
       * @example
       *     throw { message: 'error message we added' };
       */
      logger.error(exception.message, errorData);
    };
  }
})();