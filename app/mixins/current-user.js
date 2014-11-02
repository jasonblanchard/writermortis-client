import Ember from 'ember';

export default Ember.Mixin.create({

  beforeModel: function() {
    var router = this;
    var session = this.get('session');
    var userId = session.get('content').user_id;
    if (userId !== undefined) {
      this.store.find('user', userId).then(function(user) {
        router.controllerFor('application').set('currentUser', user);
      });
    }
  },

  currentUser: function() {
    return this.controllerFor('application').get('currentUser');
  }.property()
});
