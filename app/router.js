import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.resource('stories', { path: 'stories' }, function() { 
    this.resource('story', { path: 'story/:story_id' });
  });
  this.resource('stories', function() { });
  this.route('logout');
});

export default Router;
