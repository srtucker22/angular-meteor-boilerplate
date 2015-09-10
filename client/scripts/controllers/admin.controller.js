(function(){
  angular.module('app').controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['$meteor', 'currentUser'];

  function AdminCtrl($meteor, currentUser){
    var vm = this;
  }
})();