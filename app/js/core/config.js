(function() {
  'use strict';

  var core = angular.module('app.core');


  /******** App Config ***********/
  var config = {
    appErrorPrefix: '[Cute Animals Error] ', //Configure the exceptionHandler decorator
    appTitle: 'Cute Animals',
    version: '1.0.0',
    apiKey: 'dc6zaTOxFJmzC',
    apiUrl: 'http://api.giphy.com/v1/gifs/search'
  };
  core.value('config', config);

  core.config(configure);

  configure.$inject = ['$logProvider', '$routeProvider', '$locationProvider', 'routehelperConfigProvider',
    'exceptionConfigProvider'];

  function configure($logProvider, $routeProvider, $locationProvider, routehelperConfigProvider,
                     exceptionConfigProvider) {

    $locationProvider.html5Mode(true);

    // turn debugging off/on (no info or warn)
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }

    // Configure the common route provider
    routehelperConfigProvider.config.$routeProvider = $routeProvider;
    routehelperConfigProvider.config.docTitle = 'Cute Animals ';
    var resolveAlways = {
      ready: ['dataService', function (dataService) {
          return dataService.ready();
      }]
    };
    routehelperConfigProvider.config.resolveAlways = resolveAlways;

    // Configure the common exception handler
    exceptionConfigProvider.config.appErrorPrefix = config.appErrorPrefix;
  }

})();
