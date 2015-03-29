import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

  beforeModel: function(transition) {
    if ((transition.targetName === 'index') && (this.get('session').get('isAuthenticated'))) {
      this.transitionTo('stories');
    }
    this._super(transition);
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
