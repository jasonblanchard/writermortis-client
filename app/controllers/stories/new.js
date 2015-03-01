import Ember from 'ember';

export default Ember.Controller.extend({
  needs: 'application',
  currentUser: Ember.computed.alias('application.currentUser'),
  newStory: function() {
    return this.store.createRecord('story');
  }.property(),

  firstPiece: function() {
    return this.store.createRecord('piece');
  }.property(),

  actions: {
    createStory: function() {
      var controller = this;
      var story = this.get('newStory');
      var piece = this.get('firstPiece');

      story.save().then(function(story) {
        piece.set('story', story);
        piece.save().then(function() {
          controller.transitionToRoute('story', story);
        });
      });

    }
  }
});
