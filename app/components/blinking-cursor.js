import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  blink: function() {
    var component = this;
    setTimeout(function() {
      component.$().toggle();
      component.blink();
    }, 700)
  },

  didInsertElement: function() {
    this.blink();
  }
});
