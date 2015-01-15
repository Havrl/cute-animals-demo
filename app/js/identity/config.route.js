(function() {
  'use strict';

  angular
      .module('app.identity')
      .run(appRun);

  appRun.$inject = ['routehelper'];

  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [
      {
        url: '/sign-in',
        config: {
          templateUrl: 'identity/login.html',
          controller: 'Identity',
          controllerAs: 'vm'
        }
      },
      {
        url: '/sign-up',
        config: {
          templateUrl: 'identity/sign-up.html',
          controller: 'Identity',
          controllerAs: 'vm'
        }
      },
      {
        url: '/forgot',
        config: {
          templateUrl: 'identity/forgot.html',
          controller: 'Identity',
          controllerAs: 'vm'
        }
      }
    ];
  }
})();
