(function(){
  angular.module("app").controller('LoginModalCtrl', LoginModalCtrl);

  LoginModalCtrl.$inject = ['$meteor', '$scope', '$modalInstance', 'APP'];

  function LoginModalCtrl($meteor, $scope, $modalInstance, APP) {
    var vm = this;
    vm.appName = APP.NAME;
    vm.forgotPassword = forgotPassword;
    vm.loginWithFacebook = loginWithFacebook;
    vm.loginWithPassword = loginWithPassword;

    // log the user in with facebook
    function loginWithFacebook(){

      // basic detect device type
      var loginStyle;
      if(bowser.mobile || bowser.tablet) {
        loginStyle = 'redirect';  // redirect if mobile to avoid bug
      } else {
        loginStyle = 'popup'; // otherwise popup
      }

      $meteor.loginWithFacebook({
        requestPermissions: ['public_profile', 'email'],
        loginStyle: loginStyle
      }).then(function(res){
        $modalInstance.close(res);
      }, function(err){
        console.error(err);
      });
    }

    function loginWithPassword(user){
      if($scope.loginForm.$invalid){
        
        if(!$scope.loginForm.email || $scope.loginForm.email.$invalid){
          vm.alert = {type: "danger", msg: "please enter a valid email address"};
          return;
        }

        if(!$scope.loginForm.password || $scope.loginForm.password.$invalid){
          vm.alert = {type: "danger", msg: "please enter a valid password"};
          return;
        }

        vm.alert = {type: "danger", msg: "please enter a valid email and password"};
        return;
      }

      vm.alert = null;

      $meteor.loginWithPassword(user.email, user.pass).then(function(res){
        $modalInstance.close(res);
      }, function(err){
        vm.alert = {type: "danger", msg: err.message};
      });
    }

    function forgotPassword(){
      $modalInstance.dismiss("forgot");
    }

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
})();