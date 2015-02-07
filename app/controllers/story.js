import Ember from 'ember';

export default Ember.ObjectController.extend({
  
  newPiece: function() {
    return this.store.createRecord('piece', {text: '...'});
  }.property('model'),
  
  persistentPiece: function() {
    return this.store.createRecord('piece');
  }.property('model'),

  visiblePieces: function() {
    var pieces = this.get('model').get('pieces');
    return Ember.A([pieces.get('lastObject')]);
  }.property('model', 'model.pieces.@each'),

  piecesLeft: function() {
    var maxPieces = this.get('model').get('totalPieces');
    var currentPieces = this.get('model').get('pieces').get('length');
    return maxPieces - currentPieces;
  }.property('model', 'model.pieces.@each'),

  isFinished: function() {
    return this.get('piecesLeft') === 0;
  }.property('piecesLeft'),

  participants: function() {
    var story = this.get('model');
    return story.get('pieces').mapBy('user').uniq();
  }.property('model', 'model.pieces.@each'),

  canPost: function() {
    // FIXME Ugggh
    if ( this.get('currentUser') ) {
      return this.get('currentUser').id !== this.get('model').get('pieces').get('lastObject').get('user').get('id');
    } else {
      return false;
    }
  }.property('currentUser', 'model.pieces.@each'),
});
