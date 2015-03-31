(function(){
  angular.module("app").controller('SignupModalCtrl', SignupModalCtrl);

  SignupModalCtrl.$inject = ['$meteor', '$scope', '$modalInstance', 'APP'];

  function SignupModalCtrl($meteor, $scope, $modalInstance, APP) {
    var vm = this;
    vm.appName = APP.NAME;
    vm.createUser = createUser;
    vm.loginWithFacebook = loginWithFacebook;

    // create a new user with name, email, password
    function createUser(user){
      if($scope.signupForm.$invalid){
        
        if(!$scope.signupForm.name || $scope.signupForm.name.$invalid){
          vm.alert = {type: "danger", msg: "please enter a valid name"};
          return;
        }

        if(!$scope.signupForm.email || $scope.signupForm.email.$invalid){
          vm.alert = {type: "danger", msg: "please enter a valid email address"};
          return;
        }

        if(!$scope.signupForm.pw || $scope.signupForm.pw.$invalid){
          vm.alert = {type: "danger", msg: "please enter a valid password"};
          return;
        }

        vm.alert = {type: "danger", msg: "please enter a valid name, email, and password"};
        return;
      }

      vm.alert = null;

      $meteor.createUser(user).then(function(res){
        $modalInstance.close(res);
      }, function(err){
        vm.alert = {type: "danger", msg: err.message};
      });
    }

    // log the user in with facebook
    function loginWithFacebook(){

      // basic detect device type
      var loginStyle;
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
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
        console.log(err);
      });
    }

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
})();