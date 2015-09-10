Meteor.publish('sample_collection', function () {
  if (this.userId) {
    return SampleCollection.find({owner: this.userId},
      {fields: {stuff: 1}});
  } else {
    this.ready();
  }
});