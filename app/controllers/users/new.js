import Ember from 'ember';

export default Ember.Controller.extend({
  newUser: function() {
    // TODO Change to a 'registrations' object
    return this.store.createRecord('registration');
  }.property(),

  actions: {
    createUser: function() {
      var self = this;
      // TODO
      // Cleanup errors
      // On success, redirect somewhere
      // Style form
      this.get('newUser').save().then(
        function() {}, 
        function() { console.log(self.get('newUser').get('errors').get("passwordConfirmation"));
      });
    }
  }

});
