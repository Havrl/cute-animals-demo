(function() {
  'use strict';

  angular
      .module('app.core')
      .factory('dataService', dataService);

  dataService.$inject = ['$q', '$http', 'config', 'exception', 'logger'];

  function dataService($q, $http, config, exception, logger) {
    var api_key = config.apiKey;
    var url = config.apiUrl;
    var isPrimed = false;
    var primePromise;

    var service = {
      getList: getList,
      ready: ready
    };

    return service;
    ///////////////

    /**
     * Gets a paged list of objects using GET verb
     **/
    function getList(search, pageIndex, pageSize) {
      var params = !_.isEmpty(search) ? '?q=' + search : '';
      
      params += buildPagingUri(pageIndex, pageSize);

      return $http.get(url + params).then(getListComplete);

      function getListComplete(res) {
        return res.data;
      }
    }

    /**
     * @desc For using in controllers instead of the route resolver
     * @example
     * var promises = [getData()];
     * return dataservice.ready(promises).then(function(){
     *   logger.info('Activated View');
     * });
     */
    function ready(nextPromises) {
      var readyPromise = primePromise || prime();

      return readyPromise
          .then(function() {
            return $q.all(nextPromises);
          })
          .catch(exception.catcher('"ready" function failed'));
    }

    /*
     Helper method to build uri paging
     */
    function buildPagingUri(pageIndex, pageSize) {
      var uri = '&limit=' + pageSize + '&offset=' + pageIndex + '&api_key=' + api_key;
      return uri;
    }

    /*
      Helper method for ready function
     */
    function prime() {
      // This function can only be called once.
      if (primePromise) {
        return primePromise;
      }

      primePromise = $q.when(true).then(success);
      return primePromise;

      function success() {
        isPrimed = true;
        //logger.info('Primed data');
      }
    }
  }
})();
