import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    setActiveAuthor: function(authorId) {
      this.sendAction('setActiveAuthor', authorId);
    }
  }
});
