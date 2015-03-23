import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    return this.store.createRecord('story');
  },

  deactivate: function() {
    var model = this.controllerFor('stories.new').get('model');
    model.rollback();
  }
});
