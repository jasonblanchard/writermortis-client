import Ember from "ember";
import Session from "simple-auth/session";

export function initialize(container) {
  Session.reopen({
    currentUser: function() {
      var userId = this.get('secure.user_id');
      if (!Ember.isEmpty(userId)) {
        return container.lookup('store:main').find('user', userId);
      }
    }.property('user_id')
  });
}

export default {
  name: 'current-user',
  before: 'simple-auth',
  initialize: initialize
};
