import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    createPiece: function() {
      var component = this;
      var newPiece = component.get('newPiece');
      var persistentPiece = component.get('persistentPiece');
      var story = component.get('story');

      persistentPiece.set('user', component.get('currentUser'));
      persistentPiece.set('story', story);
      persistentPiece.set('text', newPiece.get('text'));

      persistentPiece.save().then(function(piece) {
        story.get('pieces').addObject(piece);
        newPiece.set('text', '');
      }).catch(function(response) {
        piece.deleteRecord();
        console.log(response.responseJSON.errors);
      })
    }

  }
});
