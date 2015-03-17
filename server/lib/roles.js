// update a users permissions
Meteor.methods({
  /**
   * update a user's permissions
   *
   * @param {Object} targetUserId Id of user to update
   * @param {Array} roles User's new permissions
   * @param {String} group Company to update permissions for
   */
  updateRoles: function (targetUserId, roles, group) {
    var loggedInUser = Meteor.user();

    if (!loggedInUser ||
        !Roles.userIsInRole(loggedInUser, ['manage-users','admin'], group)) {
      throw new Meteor.Error(403, "Access denied");
    }

    Roles.setUserRoles(targetUser, roles, group);
  },

  /**
   * delete a user from a specific group
   * 
   * @method deleteUser
   * @param {String} targetUserId _id of user to delete
   * @param {String} group Company to update permissions for
   */
  deleteUser: function (targetUserId, group) {
    var loggedInUser = Meteor.user();

    if (!loggedInUser ||
        (!Roles.userIsInRole(loggedInUser, ['manage-users','admin'], group) && Meteor.userId() != targetUserId)) {
      throw new Meteor.Error(403, "Access denied");
    }

    // remove permissions for target group
    Roles.setUserRoles(targetUserId, [], group);

    // do other actions required when a user is removed...
    return Meteor.users.remove({_id: targetUserId});
  },
});

// don't allow existing low level user to create new users other than themselves
Accounts.validateNewUser(function (user) {
  var loggedInUser = this.userId;

  if (!loggedInUser || Roles.userIsInRole(loggedInUser, ['admin','manage-users'])) {
    return true;
  }
  throw new Meteor.Error(403, "Not authorized to create new users");
});