import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import currentUserMixin from 'writermortis/mixins/current-user';

export default Ember.Route.extend(ApplicationRouteMixin, currentUserMixin, {
  actions: {
    sessionAuthenticationSucceeded: function() {
      this.transitionTo('stories');
    }
  }
});
