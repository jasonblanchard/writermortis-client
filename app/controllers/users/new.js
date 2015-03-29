import Ember from 'ember';
import AuthenticationControllerMixin from 'simple-auth/mixins/authentication-controller-mixin';

export default Ember.Controller.extend(AuthenticationControllerMixin, {
  newUser: function() {
    return this.store.createRecord('registration');
  }.property(),

  actions: {
    createUser: function() {
      var controller = this;

      this.get('newUser').save().then(function() {
        var user = controller.get('newUser');
        controller.get('session').authenticate('simple-auth-authenticator:devise', {identification: user.get('email'), password: user.get('password')}).then(function() {
          console.log(controller.get("session"));
          controller.transitionToRoute('stories');
        });
      }, 
      function() {}); // Silently handle rejected promist to show server-side validation errors
    }
  }

});
