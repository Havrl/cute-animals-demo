(function() {
  'use strict';

  angular
      .module('blocks.exception')
      .factory('exception', exception);

  exception.$inject = ['logger','$location', 'flashService', '$sessionStorage', '$http'];

  function exception(logger, $location, flashService, $sessionStorage, $http) {
    var service = {
      catcher: catcher
    };
    return service;

    function catcher(message) {
      return function(reason) {

        var location = $location.path();

        // don't display 401 errors on api calls outside of login, instead logout and redirect to login
        if (reason.status === 401 && location !== '/login') {

          flashService.set('Authentication error. Please sign in again.');
          logout();

          // redirect to login with return url of the page where auth error occur,
          // note: using the replace() will help to fix the return url set to correct page,
          // otherwise it will point to login, probably because of routehelper checking for auth as well.
          $location.path('/login').search({ returnUrl: location }).replace();
        } else {
          logger.error(message, reason);
        }
      };
    }

    // Note: this is a duplicate of identityService.logout() as circular di error cannot allow me to call that
    function logout() {
      // remove user session
      delete $sessionStorage.hash;
      delete $sessionStorage.user;

      // remove authorization header
      delete $http.defaults.headers.common['Authorization'];
    }
  }
})();