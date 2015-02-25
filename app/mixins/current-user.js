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

  // TODO What happens if subclasses redefine setupController?
  setupController: function(controller, model) {
    controller.needs = ['application'];
    controller.set('model', model);
  }
});
