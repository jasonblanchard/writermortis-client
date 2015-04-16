import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: Ember.computed.alias('session.currentUser'),

  showNavbar: function() {
    return this.get('currentRouteName') !== 'index';
  }.property('currentRouteName'),

  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    }
  }
});
