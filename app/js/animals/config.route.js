(function() {
  'use strict';

  angular
      .module('app.animals')
      .run(appRun);

  appRun.$inject = ['routehelper'];

  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [
      {
        url: '/',
        config: {
          templateUrl: 'animals/animals.html',
          controller: 'Animals',
          controllerAs: 'vm',
          title: 'Animals'
        }
      }
    ];
  }
})();
