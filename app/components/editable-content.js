import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['editable'],
  keyUp: function() {
    this.set('text', this.$('span').text());
  }
});
