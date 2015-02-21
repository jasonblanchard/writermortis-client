import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    createPiece: function() {
      this.sendAction('action');
    }

  }
});
