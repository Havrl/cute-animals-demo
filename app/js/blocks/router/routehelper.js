(function() {
  'use strict';

  angular
      .module('blocks.router')
      .provider('routehelperConfig', routehelperConfig)
      .factory('routehelper', routehelper);

  routehelper.$inject = ['$q', '$location', '$rootScope', '$route', 'logger', 'routehelperConfig', 'identityService'];

  // Must configure via the routehelperConfigProvider
  function routehelperConfig() {
    /* jshint validthis:true */
    this.config = {
      // These are the properties we need to set
      // $routeProvider: undefined
      // docTitle: ''
      // resolveAlways: {ready: function(){ } }
    };

    this.$get = function() {
      return {
        config: this.config
      };
    };
  }

  function routehelper($q, $location, $rootScope, $route, logger, routehelperConfig, identityService) {
    var handlingRouteChangeError = false;
    var routeCounts = {
      errors: 0,
      changes: 0
    };
    var routes = [];
    var $routeProvider = routehelperConfig.config.$routeProvider;

    var service = {
      configureRoutes: configureRoutes,
      getRoutes: getRoutes,
      routeCounts: routeCounts
    };

    init();

    return service;
    ///////////////

    function configureRoutes(routes) {
      routes.forEach(function(route) {
        route.config.resolve =
            angular.extend(route.config.resolve || {}, routehelperConfig.config.resolveAlways);

        if(route.config.authRequired) {
          $routeProvider.whenAuthenticated(route.url, route.config);
        }else {
          $routeProvider.when(route.url, route.config);
        }
      });
      $routeProvider.otherwise({redirectTo: '/'});
    }

    function handleRoutingErrors() {
      // Route cancellation:
      // On routing error, go to the dashboard.
      // Provide an exit clause if it tries to do it twice.
      $rootScope.$on('$routeChangeError',
          function(event, current, previous, rejection) {
            if (handlingRouteChangeError) {
              return;
            }
            routeCounts.errors++;
            handlingRouteChangeError = true;

            // check authentication rejection
            if (rejection && rejection.needsAuthentication === true) {
              var returnUrl = $location.url();

              // user needs authentication, redirect to /login and pass along the return URL
              $location.path('/login').search({ returnUrl: returnUrl });
            }else {
              // otherwise log the route error and redirect to the dashboard
              var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
                  'unknown target';
              var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
              logger.warning(msg, [current]);
              $location.path('/');
            }
          }
      );
    }

    function init() {
      // set the authorization header on the browser refresh
      identityService.setAuthHeader(identityService.getAuthHash());

      handleAdminRoutes();
      handleRoutingErrors();
      updateDocTitle();
    }

    function getRoutes() {
      for (var prop in $route.routes) {
        if ($route.routes.hasOwnProperty(prop)) {
          var route = $route.routes[prop];
          var isRoute = !!route.title;
          if (isRoute) {
            routes.push(route);
          }
        }
      }
      return routes;
    }

    function updateDocTitle() {
      $rootScope.$on('$routeChangeSuccess',
          function(event, current, previous) {
            routeCounts.changes++;
            handlingRouteChangeError = false;
            var title = routehelperConfig.config.docTitle + ' ' + (current.title || '');
            $rootScope.indexTitle = title; // data bind to <title>
            $rootScope.pageTitle = current.title; // action bar title
          }
      );
    }

    /*
      Handle authenticated routes
      link: http://plnkr.co/edit/U7E2DC?p=preview
     */
    function handleAdminRoutes() {
      $routeProvider.whenAuthenticated = function(path, route) {
        route.resolve = route.resolve || {};

        angular.extend(route.resolve, { isLoggedIn: isLoggedIn });

        return $routeProvider.when(path, route);
      };

      function isLoggedIn($q, identityService) {
        var deferred = $q.defer();

        if (identityService.isAuthenticated()) {
          deferred.resolve();
        } else {
          deferred.reject({ needsAuthentication: true });
        }

        return deferred.promise;
      }
      isLoggedIn.$inject = ['$q', 'identityService'];
    }

  }
})();
