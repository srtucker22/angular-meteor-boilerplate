(function(){
  angular.module('app', ['angular-meteor', 'ui.router', 'ui.bootstrap', 'angulike'])
  .constant('APP', {
      'NAME': 'Angular-Meteor Boilerplate'
    })
    .constant('GITHUB', {
      'URL': 'https://github.com/srtucker22/angular-meteor-boilerplate'
    })

  .run([
    '$meteor', '$rootScope', function ($meteor, $rootScope) {
      $meteor.call('getFacebookAppId').then(function(id){
        $rootScope.facebookAppId = id;
      });
    }
  ]);
})();