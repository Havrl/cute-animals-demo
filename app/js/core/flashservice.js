// Displays the message on the route change
(function() {
  'use strict';

  angular
      .module('app.core')
      .factory('flashService', flashService);

  flashService.$inject = ['$rootScope', 'logger'];

  function flashService($rootScope, logger) {
    var queue = [];

    var currentMsg = null;

    $rootScope.$on('$routeChangeSuccess', function () {
      if (queue.length > 0) {
        var msg = queue.shift();
        logger.showAlert(msg.text, msg.type);
      }
    });

    return {
      set: set,
      get: get
    };
    ///////////

    function set(msg, type) {
      type = type || 'danger';
      queue.push({text: msg, type: type});
    }

    function get() {
      return queue.length > 0 ? queue.shift() : null;
    }
  }

})();