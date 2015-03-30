import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {
  needs: 'application',
  currentUser: Ember.computed.alias('application.currentUser'),
  newStory: Ember.computed.alias('model'),

  firstPiece: function() {
    return this.store.createRecord('piece');
  }.property(),

  currentPieceSentenceCount: function() {
    return this.get('firstPiece').get('sentenceCount');
  }.property('firstPiece.text'),

  validations: {
    'model.title': {
      presence: true,
      length: { maximum: 50 }
    },
    'firstPiece.text': {
      presence: true
    },
    'firstPiece.sentenceCount': {
      inline: EmberValidations.validator(function() {
        if (this.get('model').get('newStory')) {
          if (this.get('model').get('firstPiece').get('sentenceCount') > this.get('model').get('newStory').get('maxSentences')) {
            return "Too many sentences!";
          }
        }
      })
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
