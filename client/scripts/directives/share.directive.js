(function(){
  angular.module('app').directive('share', shareDirective);

  shareDirective.$inject = [];

  function shareDirective(){
    var directive = {
      link: link,
      templateUrl: 'client/views/modules/share.ng.html',
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