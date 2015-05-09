import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: Ember.computed.alias('session.currentUser'),

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
