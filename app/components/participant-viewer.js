import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isActive'],
  isActive: function() {
    if (this.get('participant').get('id') === String(this.get('activeAuthorId'))) {
      return 'active';
    } else {
      return '';
    }
  }.property('activeAuthorId')
});
