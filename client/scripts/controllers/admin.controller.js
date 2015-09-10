(function(){
  angular.module('app').controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['$meteor', '$scope', '$state', 'currentUser'];

  function AdminCtrl($meteor, $scope, $state, currentUser){
    var vm = this;

    $scope.$on('currentUser', function(){
      var roles = 'admin';
      $meteor.requireValidUser(function(user) {
        return user.roles && user.roles.__global_roles__ && _.intersection(user.roles.__global_roles__, roles).length > 0;
      }).then(function(){

      }, function(err){
        $state.go('home');
      });
    });
  }
})();