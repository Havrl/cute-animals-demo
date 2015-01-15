/**
 * @file identity.service.js
 * @description holds the functionality related to user identity and authentication / authorization
 */
(function() {
  'use strict';

  angular
      .module('app.identity')
      .factory('identityService', identityService);

  identityService.$inject = ['$http', '$sessionStorage', '$location', 'config', 'exception', 'logger'];

  function identityService($http, $sessionStorage, $location, config, exception, logger) {

    var url = config.apiUrl;

    var service = {
      authenticate: authenticate,
      register: register,
      logout: logout,
      setAuthHeader: setAuthHeader,
      getAuthHash: getAuthHash,
      getUser: getUser,
      isAuthenticated: isAuthenticated,
      checkUniqueVal: checkUniqueVal,
      replaceAuthUsername: replaceAuth,
      renewAuth: renewAuth
    };

    return service;


    ////////////////////////////////////////////////////////////////////

    /*
      Authenticates the user based on provided username / password
     */
    function authenticate(credentials) {

      // generate the hash string
      var hash = makeAuthHash( credentials.email, credentials.password );

      // set the config for http call
      var config = {method: 'GET', url: url + 'user',
        headers: {'Authorization': 'Basic: ' + hash, 'Content-Type':'application/json'}};

      // retrieve the user details and return the promise
      return $http(config).then(getUserComplete);

      // on success: store the user details and hash in the session storage and add the authorization header
      function getUserComplete(response){
        saveUser(response.data);
        setAuthHeader(hash);
        saveAuthHash(hash);
      }
    }

    /*
      Removes the saved session and the authorization header
     */
    function logout() {
      // remove user session
      delete $sessionStorage.hash;
      delete $sessionStorage.user;

      // remove authorization header
      delete $http.defaults.headers.common['Authorization'];
    }

    /*
      Generates the hash string from provided user and password values
     */
    function makeAuthHash(user, password) {
      var token = user + ':' + password;
      return Base64.encode(token);
    }

    /*
      Sets the default basic authorization header for provided hash string
     */
    function setAuthHeader(hash) {
      if (hash){
        $http.defaults.headers.common.Authorization = 'Basic ' + hash;
      }
    }

    /*
      Gets the hash stored in the session storage used in the basic authorization header
     */
    function getAuthHash() {
      return $sessionStorage.hash;
    }

    /*
      Stores the provided hash string the session storage
     */
    function saveAuthHash(hash) {
      $sessionStorage.hash = hash;
    }

    /*
      Stores the provided user object in the session storage
     */
    function saveUser(user) {
      $sessionStorage.user = user;
    }

    /*
      Retrieves the user object from the session storage
     */
    function getUser() {
      return $sessionStorage.user;
    }

    /*
      Checks if the current user is authenticated
     */
    function isAuthenticated(){
      var user = getUser();
      return user && user._id;
    }

    /*
      Replaces the saved hash and authentication header based on the provided credentials
      */
    function renewAuth(username, pass){
      var hash = makeAuthHash( username, pass );
      setAuthHeader(hash);
      saveAuthHash(hash);
    }

    /*
      Replaces the username in the stored hash and returns true on success, otherwise returns false
     */
    function replaceAuth(username){

      var hash = getAuthHash();
      if(!hash){
        return false;
      }
      var plain = Base64.decode(hash).split(':');
      if(plain.length !== 2){
        return false;
      }
      if(plain[0] === username){
        return true;
      }else {
        renewAuth(username, plain[1]);
      }
      return true;
    }

    /*
      Creates user account based on the provided user details
     */
    function register(details) {
      return $http.post(url + 'account', details);
    }

    /*
      Checks if the provided value for the key is unique
     */
    function checkUniqueVal(key, value) {
      return $http.get(url + 'account/unique_' + key + '?' + key + '=' + value);
    }

  }
})();