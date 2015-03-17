(function(){
  angular.module("app").run(['$rootScope', '$state', '$meteor', function($rootScope, $state, $meteor) {

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){ 
      // console.log(event);
      // console.log(toState);
      // console.log(toParams);
      // console.log(fromState);
      // console.log(fromParams);
      console.log(error);

      if(error.status === 401){
        $state.go('401');
      }else{
        $state.go('404');
      }
    });

    $rootScope.tweet = "your tweet message";
    $rootScope.facebookUrl = "//yourpath.meteor.com/";

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
            console.log('err', error);
          }
        });
      }
    };

    $rootScope.loginWithFacebook = function(){

      // basic detect device type
      var loginStyle;
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        loginStyle = 'redirect';  // redirect if mobile to avoid bug
      } else {
        loginStyle = 'popup'; // otherwise popup
      }

      Meteor.loginWithFacebook({
        requestPermissions: ['public_profile', 'email'],
        loginStyle: loginStyle
      }, function(error) {
        if(error) {
          console.log(error);
        }else{
          // logic after user logs in
        }
      });
    };

  }]);

  angular.module("app").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'client/home/home.ng.html',
          controller: 'HomeCtrl',
          controllerAs: 'homectrl'
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

    $urlRouterProvider.otherwise("/404");
  }]);
})();