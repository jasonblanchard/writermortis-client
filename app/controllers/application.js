import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: function() {
    return this.get('session.currentUser');
  }.property('session.currentUser', 'session.isAuthenticated'),

  showNavbar: function() {
    var routeName = this.get('currentRouteName');
    return (routeName !== 'index') && (routeName !== 'users.new');
  }.property('currentRouteName'),

  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    }
  }
});
