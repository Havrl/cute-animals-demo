(function() {
  'use strict';

  angular
      .module('app.core')
      .factory('dataService', dataService);

  dataService.$inject = ['$q', '$http', 'config', 'exception', 'logger'];

  function dataService($q, $http, config, exception, logger) {
    var url = config.apiUrl;
    var isPrimed = false;
    var primePromise;

    var service = {
      getList: getList,
      getList2: getList2,
      getPagedList: getPagedList,
      getPagedList2: getPagedList2,
      getOne: getOne,
      getOne2: getOne2,
      create: create,
      insert: insert,
      insert2: insert2,
      update: update,
      update2: update2,
      remove: remove,
      remove2: remove2,
      ready: ready
    };

    return service;
    ///////////////

    /**
     * Gets a paged list of objects using GET verb
     * @example
     * // returns the list of objects from 1 to 10
     * dataService.getPagedList('contacts', 1, 10);
     * @param {String} baseResource
     * @param {Number} pageIndex
     * @param {Number} pageSize
     * @param {String} name of sort field
     * @param {Boolean} reverse sort order or not
     * @return {promise} Returns the count of objects and an array of objects
     */
    function getPagedList(baseResource, pageIndex, pageSize, sort, reverse) {
      var resource = baseResource;
      resource += (arguments.length >= 3) ? buildPagingUri(pageIndex, pageSize, sort, reverse) : '';

      return $http.get(url + resource)
          .then(getPagedListComplete);

      function getPagedListComplete(data) {
        return {
          totalRecords: data.data.count,
          results: data.data.rows
        };
      }
    }

    /**
     * Gets a list of objects using GET verb
     * @example
     * dataService.getList('contacts');
     * @param {String} resource
     * @return {promise} Returns an array of objects
     */
    function getList(resource) {
      return $http.get(url + resource).then(function (result) {
        return result.data.rows;
      });
    }

    /**
     * Gets a list of objects with error catch
     * @param resource
     * @param errMsg
     * @returns {*}
     */
    function getList2(resource, errMsg) {
      return getList(resource).catch(exception.catcher(errMsg || 'Failed to retrieve the data'));
    }

    /**
     * Gets a paged list with error catcher
     * @see getPagedResource method for example
     * @param {String} resource
     * @param {Number} pageIndex
     * @param {Number} pageSize
     * @param {String} name of sort field
     * @param {Boolean} reverse sort order or not
     * @return {promise} Returns the count of objects and an array of objects
     */
    function getPagedList2(resource, pageIndex, pageSize, sort, reverse, errMsg) {
      return getPagedList(resource, pageIndex, pageSize, sort, reverse)
          .catch(exception.catcher(errMsg || 'Failed to retrieve the data'));
    }

    /**
     * Gets an object using GET verb
     * Gets an object using GET verb
     * @example
     * dataService.getOne('contact', '123');
     * @param {String} resource
     * @param id or resource or nothing
     * @return {promise} Returns object data
     */
    function getOne(resource, id) {
      var resourceUrl = resource;
      if(id){
        resourceUrl = resourceUrl + '/' + id;
      }
      return $http.get(url + resourceUrl).then(function (result) {
        return result.data;
      });
    }

    /**
     * Gets an object with error catch
     * @param resource
     * @param id
     * @param errMsg
     * @returns {*}
     */
    function getOne2(resource, id, errMsg) {
      return getOne(resource, id).catch(exception.catcher(errMsg || 'Failed to retrieve resource'));
    }

    /**
     * Inserts a record using POST verb
     * @example
     * dataService.insert('contacts');
     * @param {String} resource
     * @param {Object} data
     * @return {promise} result.data
     */
    function insert(resource, data) {
      return $http.post(url + resource, data).then(function (result) {
        return result.data;
      });
    }

    /**
     * Inserts a record with error catch
     * @param resource
     * @param data
     * @param errMsg
     * @returns {resolved promise with exception message}
     */
    function insert2(resource, data, errMsg) {
      return insert(resource, data).catch(exception.catcher(errMsg || 'Failed to create resource'));
    }

    /**
     * Creates a new object
     * @example
     * dataService.create();
     * @return {promise}
     */
    function create() {
      return $q.when({});
    }

    /**
     * Updates a record using PUT verb
     * @example
     * dataService.update('contact', data);
     * @param {String} resource
     * @param {Object} data
     * @return {promise} result.data
     */
    function update(resource, data) {
      return $http.put(url + resource, data).then(function (result) {
        return result.data;
      });
    }

    /**
     * Updates a record with error catch
     * @param resource
     * @param data
     * @param errMsg
     * @returns {*}
     */
    function update2(resource, data, errMsg) {
      return update(resource, data).catch(exception.catcher(errMsg || 'Failed to update resource'));
    }

    /**
     * Removes record using DELETE verb
     * @example
     * dataService.remove('contact');
     * @param {String} resource
     * @param {Number} id
     * @return {promise} result
     */
    function remove(resource, id) {
      return $http.delete(url + resource + '/' + id).then();
    }

    /**
     * Removes record with error catch
     * @param resource
     * @param id
     * @param errMsg
     * @returns {*}
     */
    function remove2(resource, id, errMsg) {
      return remove(resource, id).catch(exception.catcher(errMsg || 'Failed to delete resource'));
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
     Helper method to build uri paging and sorting part
     */
    function buildPagingUri(pageIndex, pageSize, sort, reverse) {
      var uri = '?limit=' + pageSize + '&offset=' + pageIndex;
      if(sort) {
        uri += '&sort=' + sort + '&order=' + ( reverse ? '-1' : '1' );
      }
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
