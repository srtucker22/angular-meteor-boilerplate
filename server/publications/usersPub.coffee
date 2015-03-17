Meteor.publish 'user', () -> 
  check arguments, Match.OneOf(null, undefined)
  return users.findOne this.userId

Meteor.publish 'users', () -> 
  check arguments, Match.OneOf(null, undefined)

  if Roles.userIsInRole(this.userId, ['manage-users','admin'])
    return users.find()
