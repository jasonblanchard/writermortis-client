import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import currentUserMixin from 'writermortis/mixins/current-user';

export default Ember.Route.extend(ApplicationRouteMixin, currentUserMixin, {
  actions: {
    sessionAuthenticationSucceeded: function() {
      this.transitionTo('stories');
    }
  },

  setupController: function() {

    // TODO Initialize this somewhere else
    console.log("setting up socket connection");
    var socket = io.connect('http://localhost:5001');
    var controller = this;
    var store = controller.get('store');
    socket.on("rt-change", function(rawMessage){
      console.log(rawMessage);
      if (rawMessage.action === 'create') {
        var type = rawMessage.resource;
        store.pushPayload(type, rawMessage.data);
      }
    });
  }
});
