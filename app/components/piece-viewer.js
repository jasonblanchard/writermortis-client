import Ember from 'ember';

export default Ember.Component.extend({
  mouseEnter: function() {
    var authorId = this.$('span').data('author');
    this.sendAction('setActiveAuthor', authorId);
  },

  mouseLeave: function() {
    this.sendAction('setActiveAuthor', null);
  }
});
