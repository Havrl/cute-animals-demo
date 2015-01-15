(function() {
  'use strict';

  angular
      .module('app.layout')
      .controller('Shell', Shell);

  Shell.$inject = ['$location', 'config', 'logger'];

  function Shell($location, config, logger) {
    /*jshint validthis: true */
    var vm = this;

    vm.title = config.appTitle;
  }
})();
