import Ember from "ember";
import Session from "simple-auth/session";

export default {
  name: 'current-user',
  before: 'simple-auth',
  initialize: function(container) {
    Session.reopen({
      currentUser: function() {
        var userId = this.get('user_id');
        if (!Ember.isEmpty(userId)) {
          return container.lookup('store:main').find('user', userId);
        }
      }.property('user_id')
    });
  }
};
