(function(){
  angular.module('app').directive('navbar', navbarDirective);

  navbarDirective.$inject = ['$rootScope'];

  function navbarDirective($rootScope){
    var directive = {
      link: link,
      templateUrl: 'client/views/modules/navbar.ng.html',
      restrict: 'EA',
      replace: true,
    };
    return directive;

    function link(scope, element, attrs) {
      scope.routes = ['home', 'about', 'admin'];
    }
  }
})();