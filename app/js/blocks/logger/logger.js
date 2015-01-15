(function() {
  'use strict';

  angular
      .module('blocks.logger')
      .factory('logger', logger);

  logger.$inject = ['$log', '$alert'];

  function logger($log, $alert) {

    var service = {
      error: error,
      info: info,
      success: success,
      warning: warning,

      showAlert: showAlert,

      // straight to console; bypass alert
      log: $log.log
    };

    return service;
    /////////////////////

    function error(message, data) {
      showAlert(message, 'danger');
      $log.error('logger.error: ' + message, data);
    }

    function info(message, data) {
      $log.info('Info: ' + message, data);
    }

    function success(message, data) {
      $log.info('Success: ' + message, data);
    }

    function warning(message, data) {
      $log.info('Warning: ' + message, data);
    }

    function showAlert(msg, type){
      $alert({content: msg, container: '#alerts-container',
        type: type, show: true});
    }
  }
}());
