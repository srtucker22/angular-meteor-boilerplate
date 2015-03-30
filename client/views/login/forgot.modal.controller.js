(function(){
  angular.module("app").controller('ForgotModalCtrl', ForgotModalCtrl);

  ForgotModalCtrl.$inject = ['$meteor', '$scope', '$modalInstance', 'APP'];

  function ForgotModalCtrl($meteor, $scope, $modalInstance, APP) {
    var vm = this;
    vm.appName = APP.NAME;
    vm.forgotPassword = forgotPassword;

    // send reset password email
    function forgotPassword(user){
      // validate form first
      if($scope.loginForm.$invalid){
        vm.alert = {type: "danger", msg: "please enter a valid email address"};
        return;
      }

      vm.alert = null;

      $meteor.forgotPassword(user).then(function(){
        vm.alert = {type: "success", msg: "a message has been sent"};
      }, function(err){
        vm.alert = {type: "danger", msg: err.message};
      });
    }

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
})();