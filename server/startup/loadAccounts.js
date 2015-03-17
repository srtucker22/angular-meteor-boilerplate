// configure first upperclass users
Meteor.startup(function () {
  if (Meteor.users.find().fetch().length === 0) {
    
    var users = [
      {name:"Manage-Users User", email:"manage@example.com", roles:['manage-users']},
      {name:"Administrator", email:"srtucker22@gmail.com", roles:['admin']}
    ];

    _.each(users, function (user) {
      console.log(user);

      var id = Accounts.createUser({
        email: user.email,
        password: "apple1",
        profile: { name: user.name }
      });

      if (user.roles.length > 0) {
        // Need _id of existing user record so this call must come 
        // after `Accounts.createUser` or `Accounts.onCreate`
        Roles.addUsersToRoles(id, user.roles, Roles.GLOBAL_GROUP);
      }
    });
  }
});