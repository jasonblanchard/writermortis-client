import Ember from 'ember';

export default Ember.Component.extend({

  isDisabled: function() {
    if (this.get('newPiece').get('text')) {
      var text = this.get('newPiece').get('text'); // TODO: Or when there are too many sentences
      return (text.length <= 0);
    } else {
      return true;
    }
  }.property('newPiece.text'),

  actions: {

    createPiece: function() {
      this.sendAction('action');
    }

  }
});
