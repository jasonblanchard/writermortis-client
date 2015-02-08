import Ember from 'ember';

export default Ember.ObjectController.extend({
  
  newPiece: function() {
    return this.store.createRecord('piece', {text: '...'});
  }.property('model'),
  
  persistentPiece: function() {
    return this.store.createRecord('piece');
  }.property('model'),

  visiblePiece: function() {
    var pieces = this.get('model').get('pieces');
    return pieces.get('lastObject');
  }.property('model', 'model.pieces.@each'),

  currentPieceLength: function() {
    return this.get('model').get('pieces').get('length');
  }.property('model', 'model.pieces.@each'),

  piecesLeft: function() {
    var maxPieces = this.get('totalPieces');
    var currentPieces = this.get('currentPieceLength');
    return maxPieces - currentPieces;
  }.property('model', 'currentPieceLength'),

  percentComplete: function() {
    var pieces = this.get('model').get('pieces').get('length');
    var totalPossible = this.get('model').get('totalPieces');
    return Math.round((pieces / totalPossible) * 100);
  }.property('piecesLeft'),

  progressBarStyle: function() {
    return "width: " + this.get('percentComplete') + "%;";
  }.property('percentComplete'),

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
