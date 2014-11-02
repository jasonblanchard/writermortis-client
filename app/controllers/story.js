import Ember from 'ember';

export default Ember.ObjectController.extend({
  newPiece: function() {
    return this.store.createRecord('piece');
  }.property('model'),

  actions: {
    createPiece: function() {
      var controller = this;
      var piece = this.get('newPiece');

      // TODO Extract this currentUser stuff into something else
      var session = controller.get('session');
      var userId = session.get('content').user_id;
      var story = controller.get('model');
      controller.store.find('user', userId).then(function(user) {
        piece.set('user', user);
        piece.set('story', story);

        piece.save().then(function(piece) {
          controller.get('model.pieces').addObject(piece);
        });
      });
    }
  }
});
