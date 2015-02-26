import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import currentUserMixin from 'writermortis/mixins/current-user';

export default Ember.Route.extend(ApplicationRouteMixin, currentUserMixin, {

  setupController: function(controller) {

    // TODO DRY this up w/r/t the current-user mixin
    var session = this.get('session');
    var userId = session.get('content').user_id;
    if (userId !== undefined) {
      this.store.find('user', userId).then(function(user) {
        controller.set('currentUser', user);
      });
    }
  },

  actions: {
    sessionAuthenticationSucceeded: function() {
      this.transitionTo('stories');
    }
  }
});
