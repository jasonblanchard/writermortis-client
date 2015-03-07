import Ember from 'ember';

export default Ember.Component.extend({

  isDisabled: function() {
    if (this.get('newPiece').get('text')) {
      var text = this.get('newPiece').get('text');
      return (text.length <= 0) || (this.get('currentPieceSentenceCount') > this.get('story').get('maxSentences'));
    } else {
      return true;
    }
  }.property('newPiece.text'),

  redactedTopPlaceholder: function() {
    return new Array(145);
  }.property(),

  redactedBottomPlaceholder: function() {
    return new Array(250);
  }.property(),

  isEditing: false,

  actions: {

    createPiece: function() {
      this.sendAction('createPiece');
      this.set('isEditing', false);
    },

    startEditing: function() {
      // TODO Figure out how to bind this to textarea focus event
      this.set('isEditing', true);
    },

    focusOnTextarea: function() {
      this.$('textarea.new-piece').click();
      this.$('textarea.new-piece').focus();
    },

    destroyStory: function() {
      this.sendAction('destroyStory');
    }

  }
});
