Meteor.publish 'user', () -> 
  check arguments, Match.OneOf(null, undefined)
  return users.findOne this.userId
