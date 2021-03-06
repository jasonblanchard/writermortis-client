import Ember from 'ember';

export default Ember.Controller.extend({

  needs: 'application',

  currentUser: Ember.computed.alias('controllers.application.currentUser'),
  
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
  }.property('model', 'pieces', 'model.pieces.@each'),

  piecesLeft: function() {
    var maxPieces = this.get('model').get('totalPieces');
    var currentPieces = this.get('currentNumPieces');
    return maxPieces - currentPieces;
  }.property('model', 'currentNumPieces', 'model.pieces.@each'),

  percentComplete: function() {
    var pieces = this.get('currentNumPieces');
    var totalPossible = this.get('model').get('totalPieces');
    return Math.round((pieces / totalPossible) * 100);
  }.property('piecesLeft', 'currentNumPieces', 'model.pieces.@each'),

  progressBarStyle: function() {
    return "width: " + this.get('percentComplete') + "%;";
  }.property('percentComplete'),

  isFinished: function() {
    return this.get('piecesLeft') === 0;
  }.property('piecesLeft'),

  participants: function() {
    return this.get('pieces').mapBy('user').uniq();
  }.property('model', 'model.pieces.@each'),

  canPost: function() {
    var currentUser = this.get('currentUser');
    if (currentUser && (currentUser.get('id') !== undefined) && (this.get('pieces').get('lastObject') !== undefined)) {
      // FIXME Ugggh
      return String(currentUser.get('id')) !== String(this.get('pieces').get('lastObject').get('user').get('id'));
    } else {
      return false;
    }
  }.property('currentUser.id', 'model.pieces.@each'),
 
  currentPieceSentenceCount: function() {
    return this.get('newPiece').get('sentenceCount');
  }.property('newPiece.text'),

  activeAuthorId: null,

  canDelete: function() {
    var currentUser = this.get('currentUser');
    if (currentUser && currentUser.get('id') !== undefined) {
      return String(this.get('model').get('user').get('id')) === String(this.get('currentUser').get('id'));
    } else {
      return false;
    }
  }.property('model', 'currentUser.id'),

  isEditing: false,

  isFirstPiece: function() {
    return this.get('story').get('pieces').get('length') === 1;
  }.property('story', 'story.pieces.@each'),

  actions: {
    createPiece: function() {
      var controller = this;
      var proxy = controller.get('newPiece');
      var newPiece = this.store.createRecord('piece');
      var story = controller.get('model');

      newPiece.set('user', controller.get('controllers.application').get('currentUser'));
      newPiece.set('story', story);
      newPiece.set('text', proxy.get('text'));

      newPiece.save().then(function() {
        proxy.set('text', '');
      }).catch(function(response) {
        if (response.responseJSON) {
          console.log(response.responseJSON.errors);
        }
      });
    },

    setActiveAuthor: function(authorId) {
      this.set('activeAuthorId', authorId);
    },

    destroyStory: function() {
      var controller = this;
      this.get('model').destroyRecord().then(function() {
        controller.transitionToRoute('stories');
      });
    },

    undo: function() {
      var controller = this;
      var lastPiece = controller.get('visiblePiece');
      var newPiece = controller.get('newPiece');

      newPiece.set('text', lastPiece.get('text'));

      lastPiece.destroyRecord().then(function() {
        controller.set('isEditing', true);
      });
    }
  }
});
