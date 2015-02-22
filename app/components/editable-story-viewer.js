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

  actions: {

    createPiece: function() {
      this.sendAction('createPiece');
    }

  }
});
