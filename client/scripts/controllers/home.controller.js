(function(){
  angular.module('app').controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$meteor'];

  function HomeCtrl($meteor){
    var vm = this;

    vm.tweet = "your tweet message";
    vm.facebookUrl = "//yourpath.meteor.com/";
  }
})();