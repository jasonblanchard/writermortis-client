import Ember from 'ember';

export default Ember.ObjectController.extend({
  
  newPiece: function() {
    return this.store.createRecord('piece');
  }.property('model'),

  persistentPiece: function() {
    return this.store.createRecord('piece');
  }.property('model'),

  canPost: function() {
    // FIXME Ugggh
    return this.get('currentUser').id !== this.get('model').get('pieces').get('lastObject').get('user').get('id');
  }.property('currentUser', 'model.pieces.@each'),
});
