import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.resource('stories', { path: 'stories' }, function() { 
    this.resource('story', { path: '/:story_id' });
    this.route('new', {path: '/new'});
  });
  this.resource('stories', function() { });
  this.resource('users', function() {
    this.route('new', {path: '/register'});
  });
});

export default Router;
