import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {
  needs: 'application',
  currentUser: Ember.computed.alias('application.currentUser'),
  newStory: Ember.computed.alias('model'),

  firstPiece: function() {
    return this.store.createRecord('piece');
  }.property(),

  validations: {
    title: {
      presence: true,
      length: { maximum: 50 }
    }
  },

  showErrors: false,

  actions: {
    createStory: function() {
      var controller = this;
      var story = this.get('newStory');
      var piece = this.get('firstPiece');

      if (controller.get('isValid') === true) {
        story.save().then(function(story) {
          piece.set('story', story);
          piece.save().then(function() {
            controller.transitionToRoute('story', story);
          });
        });
      } else {
        controller.set('showErrors', true);
      }

    }
  }
});
