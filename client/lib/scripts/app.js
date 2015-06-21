(function(){
  angular.module("app", ["angular-meteor", "ui.router", "ui.bootstrap", "matchmedia-ng", "ngClipboard", "angulike"]);

  angular.module("app").config(['ngClipProvider', function(ngClipProvider) {
    ngClipProvider.setConfig({
      hoverClass:"btn-clipboard-hover"
    });
  }])
  .constant("APP", {
    "NAME": "Angular-Meteor Boilerplate"
  })
  .constant("FACEBOOK", {
    "APP_ID": "344290532427325"
  })

  .run([
    '$rootScope', 'FACEBOOK', function ($rootScope, FACEBOOK) {
      $rootScope.facebookAppId = FACEBOOK.APP_ID; // set your facebook app id here
    }
  ]);
})();