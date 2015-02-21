import Ember from 'ember';

export default Ember.ObjectController.extend({
  
  newPiece: function() {
    return this.store.createRecord('piece');
  }.property('model'),
  
  pieces: Ember.computed.alias('model.pieces'),

  story: Ember.computed.alias('model'),

  visiblePiece: function() {
    return this.get('pieces').get('lastObject');
  }.property('model', 'pieces'),

  currentNumPieces: function() {
    return this.get('pieces').get('length');
  }.property('model', 'pieces'),

  piecesLeft: function() {
    var maxPieces = this.get('totalPieces');
    var currentPieces = this.get('currentNumPieces');
    return maxPieces - currentPieces;
  }.property('model', 'currentNumPieces'),

  percentComplete: function() {
    var pieces = this.get('currenNumPieces');
    var totalPossible = this.get('totalPieces');
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
      return this.get('currentUser').id !== this.get('pieces').get('lastObject').get('user').get('id');
    } else {
      return false;
    }
  }.property('currentUser', 'model.pieces.@each', 'session'),

  actions: {
    createPiece: function() {
      var controller = this;
      var newPiece = controller.get('newPiece');
      var story = controller.get('model');

      newPiece.set('user', controller.get('currentUser'));
      newPiece.set('story', story);
      newPiece.set('text', newPiece.get('text'));

      newPiece.save().then(function(piece) {
        story.get('pieces').addObject(piece);
      }).catch(function(response) {
        if (response.responseJSON) {
          console.log(response.responseJSON.errors);
        }
      });
    }
  }
});
