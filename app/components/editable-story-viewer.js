import Ember from 'ember';

export default Ember.Component.extend({

  storyFocused: false,

  actions: {

    createPiece: function() {
      this.sendAction('action');
    }

  }
});
