import Ember from 'ember';
import currentUserMixin from 'writermortis/mixins/current-user';

export default Ember.Route.extend(currentUserMixin, {
  model: function(params) {
    return this.store.find('story', params.story_id);
  }
});
