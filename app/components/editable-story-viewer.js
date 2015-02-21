import Ember from 'ember';

export default Ember.Component.extend({

  isEmpty: function() {
    if (this.get('newPiece').get('text')) {
      return this.get('newPiece').get('text').length <= 0;
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
