(function(){
  angular.module('app').directive('navbar', navbarDirective);

  navbarDirective.$inject = ['$meteor', '$modal', '$rootScope'];

  function navbarDirective($meteor, $modal, $rootScope){
    var directive = {
      link: link,
      templateUrl: 'client/views/modules/navbar.ng.html',
      restrict: 'EA',
      replace: true,
    };
    return directive;

    function link(scope, element, attrs) {
      scope.routes = ['home', 'about', 'admin'];

      scope.logout = function(){
        $meteor.logout().then(function(){

        }, function(err){
          console.error(err);
        });
      };

      scope.openSignupModal = function (size) {

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
          console.log('Modal dismissed at: ' + new Date());
        });
      };

      scope.openLoginModal = function (size) {

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
          } else {
            console.log('Modal dismissed at: ' + new Date());
          }
        });
      };
    }
  }
})();