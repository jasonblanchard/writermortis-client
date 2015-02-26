import Ember from 'ember';

export default Ember.ObjectController.extend({
  
  newPiece: function() {
    return this.store.createRecord('piece');
  }.property('model'),
  
  pieces: Ember.computed.alias('model.pieces'),

  story: Ember.computed.alias('model'),

  visiblePiece: function() {
    return this.get('pieces').get('lastObject');
  }.property('model', 'pieces', 'model.pieces.@each'),

  currentNumPieces: function() {
    return this.get('pieces').get('length');
  }.property('model', 'pieces'),

  piecesLeft: function() {
    var maxPieces = this.get('totalPieces');
    var currentPieces = this.get('currentNumPieces');
    return maxPieces - currentPieces;
  }.property('model', 'currentNumPieces'),

  percentComplete: function() {
    var pieces = this.get('currentNumPieces');
    var totalPossible = this.get('totalPieces');
    return Math.round((pieces / totalPossible) * 100);
  }.property('piecesLeft', 'currentNumPieces'),

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
    var currentUser = this.get('controllers.application').get('currentUser');
    if ( currentUser ) {
      return currentUser.get('id') !== this.get('pieces').get('lastObject').get('user').get('id');
    } else {
      return false;
    }
  }.property('controllers.application.currentUser', 'model.pieces.@each', 'session'),

  currentPieceSentenceCount: function() {
    // TODO wtf
    return this.container.lookup('service:sentence-counter').count(this.get('newPiece').get('text'));
  }.property('newPiece.text'),

  activeAuthorId: null,

  actions: {
    createPiece: function() {
      var controller = this;
      var proxy = controller.get('newPiece');
      var newPiece = this.store.createRecord('piece');
      var story = controller.get('model');

      newPiece.set('user', controller.get('controllers.application').get('currentUser'));
      newPiece.set('story', story);
      newPiece.set('text', proxy.get('text'));

      newPiece.save().then(function(piece) {
        story.get('pieces').addObject(piece);
        proxy.set('text', '');
      }).catch(function(response) {
        if (response.responseJSON) {
          console.log(response.responseJSON.errors);
        }
      });
    },

    setActiveAuthor: function(authorId) {
      this.set('activeAuthorId', authorId);
    }
  }
});
