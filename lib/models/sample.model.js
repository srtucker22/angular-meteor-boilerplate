var Schema = {};

Schema.SampleCollection = new SimpleSchema({
  owner: {
    type: String,
    label: 'owner',
  },
  stuff: {
    type: String,
    label: 'stuff',
    optional: true
  }
});

SampleCollection = new Mongo.Collection('SampleCollection');

SampleCollection.attachSchema(Schema.SampleCollection);

SampleCollection.allow({
  insert: function (userId, obj) {
    return obj.owner ? userId && (obj.owner === userId || Roles.userIsInRole(userId, ['manage-users','admin'])) : false;
  },
  update: function (userId, obj, fields, modifier) {
    return obj.owner ? userId && (obj.owner === userId || Roles.userIsInRole(userId, ['manage-users','admin'])) : false;
  },
  remove: function (userId, obj, fields, modifier) {
    return obj.owner ? userId && (obj.owner === userId || Roles.userIsInRole(userId, ['manage-users','admin'])) : false;
  },
});


SampleCollection.deny({
  update: function(userId, obj, fields, modifier){

    // basic denied fields
    var denied = [];
    return _.intersection(fields, denied).length && !Roles.userIsInRole(userId, ['manage-users','admin']);
  }
});