(function(){
  angular.module('app').directive('github', githubDirective);

  githubDirective.$inject = ['GITHUB'];

  function githubDirective(GITHUB){
    var directive = {
      link: link,
      templateUrl: 'client/views/modules/github.ng.html',
      restrict: 'EA',
      replace: true,
    };
    return directive;

    function link(scope, element, attrs) {
      scope.href = GITHUB.URL;
    }
  }
})();