import Ember from 'ember';

export default Ember.ObjectController.extend({
  
  newPiece: function() {
    return this.store.createRecord('piece');
  }.property('model'),

  canPost: function() {
    // FIXME Ugggh
    return this.get('currentUser').id !== this.get('model').get('pieces').get('lastObject').get('user').get('id');
  }.property('currentUser', 'model.pieces.@each'),

  actions: {

    createPiece: function() {
      var controller = this;
      var piece = this.get('newPiece');
      var story = controller.get('model');

      piece.set('user', controller.get('currentUser'));
      piece.set('story', story);

      piece.save().then(function(piece) {
        // Happy path
      }).catch(function(response) {
        piece.deleteRecord();
        console.log(response.responseJSON.errors);
      })
    }

  }
});
