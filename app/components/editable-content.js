import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['editable-span'],

  keyUp: function() {
    this.set('text', this.$('span').text());
  },

  didInsertElement: function() {
    this.$('.content').focus();
  }
});
