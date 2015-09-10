Meteor.methods({
  getFacebookAppId: function(){
    check(arguments, [Match.Any]);
    return Meteor.settings.facebook.appId;
  }
});