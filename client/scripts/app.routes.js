(function(){
  angular.module("app").run(['$log', '$rootScope', '$state', '$meteor', '$modal', function($log, $rootScope, $state, $meteor, $modal) {
  
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){ 
      // console.log(event);
      // console.log(toState);
      // console.log(toParams);
      // console.log(fromState);
      // console.log(fromParams);
      console.error(error);

      if (error === 'AUTH_REQUIRED') {
        $state.go('401');
      } else if (error === 'AUTH_FORBIDDEN') {
        $state.go('dashboard');
      } else {
        $state.go('404');
      }
    });

    $rootScope.$watch('currentUser', function(currentUser, previousState){
      if(currentUser && !$rootScope.subscriptionHandle){
        $meteor.subscribe('user').then(function(subscriptionHandle){
          $rootScope.subscriptionHandle = subscriptionHandle;
          $rootScope.$broadcast('currentUser');
        });
      }else if(!currentUser){
        $rootScope.subscriptionHandle = null;
        $rootScope.$broadcast('currentUser');
      }
    });

    $rootScope.logout = function(){
      if($rootScope.currentUser){
        Meteor.logout(function(error){
          if(error){
            console.error('err', error);
          }
        });
      }
    };

    $rootScope.openSignupModal = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'client/views/modules/signup.modal.ng.html',
        controller: 'SignupModalCtrl',
        controllerAs: 'signupmodalctrl',
        backdrop: true,
        size: size,
        windowClass: 'auth-modal'
      });

      modalInstance.result.then(function (res) {
        
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $rootScope.openLoginModal = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'client/views/modules/login.modal.ng.html',
        controller: 'LoginModalCtrl',
        controllerAs: 'loginmodalctrl',
        backdrop: true,
        size: size,
        windowClass: 'auth-modal'
      });

      modalInstance.result.then(function (res) {
        // user successfully logged in
      }, function (err) {
        if(err === 'forgot'){
          modalInstance = $modal.open({
            templateUrl: 'client/views/modules/forgot.modal.ng.html',
            controller: 'ForgotModalCtrl',
            controllerAs: 'forgotmodalctrl',
            backdrop: true,
            size: size,
            windowClass: 'auth-modal'
          });
        }else
          $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }]);

  angular.module('app').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('admin', {
          url: '/admin',
          templateUrl: 'client/views/admin.ng.html',
          controller: 'AdminCtrl',
          controllerAs: 'adminctrl',
          resolve: {
            currentUser: ['$meteor', function($meteor){
              var roles = ['admin'];
              return $meteor.requireValidUser(function(user) {
                return user.roles && user.roles.__global_roles__ && _.intersection(user.roles.__global_roles__, roles).length > 0;
              });
            }],
          }
        })
        .state('home', {
          url: '/',
          templateUrl: 'client/views/home.ng.html',
          controller: 'HomeCtrl',
          controllerAs: 'homectrl'
        })
        .state('about', {
          url: '/about',
          templateUrl: 'client/views/about.ng.html',
          controller: 'AboutCtrl',
          controllerAs: 'aboutctrl'
        })
        .state('401', {
          url: '/401',
          template: "<div class='row'>" + 
                      "<h1 class='col-xs-12 text-center'>401</h1>" +
                      "<h3 class='col-xs-12 text-center text-uppercase'>Unauthorized</h3>" +
                      "<h4 class='col-xs-12 text-center text-uppercase'>Sorry, but you are not authorized to view that page.</h4>" +
                    "</div>"
        })
        .state('404', {
          url: '/404',
          template: "<div class='row'>" + 
                      "<h1 class='col-xs-12 text-center'>404</h1>" +
                      "<h3 class='col-xs-12 text-center text-uppercase'>Page Not Found</h3>" +
                      "<h4 class='col-xs-12 text-center text-uppercase'>Sorry, but the page you were trying to view does not exist.</h4>" +
                    "</div>"
        });

    $urlRouterProvider.otherwise('/404');
  }]);
})();