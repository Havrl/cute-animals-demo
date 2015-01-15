(function() {
  'use strict';

  angular
      .module('app.identity')
      .controller('Identity', Identity);

  Identity.$inject = ['$rootScope', '$location', 'identityService', 'dataService', 'flashService', 'logger',
    'exception'];

  function Identity($rootScope, $location, identityService, dataService, flashService, logger, exception) {

    /*jshint validthis: true */
    var vm = this;
    vm.credentials = {};
    vm.loading = false;
    vm.login = login;
    vm.register = register;
    vm.navigate = navigate;
    vm.submitEmail = submitEmail;

    activate();
    ///////////

    function activate() {
      // retrieve the returnUrl
      vm.returnUrl = $location.search().returnUrl || '/';
    }

    /*function addUserDetailsToRootScope(user) {
      var details = {is_owner: user.is_owner};
      $rootScope.loggedUser = details;
    }*/

    function cleanUp() {
      vm.loading = false;
    }

    function navigate(url) {
      $location.path(url);
    }

    function login() {
      if(vm.loginForm.$invalid){
        return;
      }

      vm.loading = true;

      identityService.authenticate(vm.credentials)
          .then(loginSuccess)
          .catch(exception.catcher('Either username or password is incorrect'))
          .finally(cleanUp);

      function loginSuccess(response) {
        var user = identityService.getUser();

        //addUserDetailsToRootScope(user);
        navigate(vm.returnUrl);
      }
    }

    function register() {

      if(vm.registerForm.$invalid){
        return;
      }

      vm.loading = true;

      identityService.register(vm.credentials)
          .then(signUpSuccess)
          .catch(exception.catcher('Failed to sign up'))
          .finally(cleanUp);

      function signUpSuccess(response){
        identityService.authenticate(vm.credentials).then().finally(afterSignUp);
      }

      function afterSignUp(){
        vm.loading = false;

        var user = identityService.getUser();
        console.log('loginSuccess: user', user);

        //addUserDetailsToRootScope(user);
        navigate('/');
      }
    }

    // Login function will call the `SecurityService.login` method
    function submitEmail() {

      if(vm.emailForm.$invalid) {
        return;
      }

      vm.loading = true;

      dataService.insert('account/forgot', { email: vm.credentials.email })
          .then(submitComplete)
          .catch(exception.catcher('Sorry, we couldn\'t find the account with that email address'))
          .finally(cleanUp);

      function submitComplete() {
        vm.loading = false;
        flashService.set('Instructions to reset your password have been emailed to you', 'success');
        $location.path('/login');
      }
    }
  }
})();
