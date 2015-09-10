(function(){
  angular.module('app').directive('shareModule', shareModuleDirective);

  shareModuleDirective.$inject = [];

  function shareModuleDirective(){
    var directive = {
      link: link,
      templateUrl: 'client/views/modules/share-module.ng.html',
      restrict: 'EA',
      replace: true,
      scope: {
        facebookUrl: '@',
        tweetMessage: '@',
      },
    };
    return directive;

    function link(scope, element, attrs) {

    }
  }
})();