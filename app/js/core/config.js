(function() {
  'use strict';

  var core = angular.module('app.core');


  /******** App Config ***********/
  var config = {
    appErrorPrefix: '[MyApp Error] ', //Configure the exceptionHandler decorator
    appTitle: 'MyApp',
    version: '1.0.0',
    returnUrl: '/',
    apiUrl: ''
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
    routehelperConfigProvider.config.docTitle = 'MyApp ';
    var resolveAlways = {
      ready: ['dataService', function (dataService) {
          return dataService.ready();
      }]
    };
    routehelperConfigProvider.config.resolveAlways = resolveAlways;

    // Configure the common exception handler
    exceptionConfigProvider.config.appErrorPrefix = config.appErrorPrefix;
  }

  /********** App Run *************
  core.run(appCoreRun);

  appCoreRun.$inject = ['$rootScope'];

  function appCoreRun($rootScope) {

    $rootScope.navigate = navigate;

    function navigate(url) {
      $location.path(url);
    }
  }
  */

})();
