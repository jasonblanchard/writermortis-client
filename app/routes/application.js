import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

  beforeModel: function() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('stories.index');
    }
    this._super();
  },

  actions: {
    sessionAuthenticationSucceeded: function() {
      this.transitionTo('stories');
    },

    sessionInvalidationSucceeded: function() {
      this.transitionTo('application');
    }
  }
});
