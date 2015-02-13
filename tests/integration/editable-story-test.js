import Ember from 'ember';
import startApp from 'writermortis/tests/helpers/start-app';
import Pretender from 'pretender';
import storiesFixtures from 'writermortis/tests/helpers/stories-fixtures';
import userFixtures from 'writermortis/tests/helpers/user-fixtures';
import mockResponse from 'writermortis/tests/helpers/mock-response';

var App;
var server;

module('Integration - editable story', {
  setup: function() {
    App = startApp();
    // TODO: Set up session with user 1 in it
    
    server = new Pretender(function() {
      this.get("/api/v1/stories", function(request) {
        return mockResponse.ok(storiesFixtures);
      });

      this.get("/api/v1/users/1", function(request) {
        return mockResponse.ok(userFixtures.jason);
      });

      this.get("/api/v1/users/2", function(request) {
        return mockResponse.ok(userFixtures.lucille);
      });
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test("Should show the story to an anon user", function() {
  visit('/stories/2').then(function() {
    currentSession().set('content', '');
    equal(find('.story h2').text(), "Second Story");
    equal($.trim(find('.last-piece').text()), 'there was a little cat named hamburger');
    equal($.trim(find(".next-action").text()), 'Sign in the add to this story!');
  });
});

test("Should show the story to user who posted last piece", function() {
  authenticateSession();
  currentSession().set('content', {user_id: 1});

  visit('/stories/2').then(function() {
    equal(find('.story h2').text(), "Second Story");
    equal($.trim(find('.last-piece').text()), 'there was a little cat named hamburger');
    equal($.trim(find(".next-action").text()), 'You added the last piece!');
  });
});

test("Should show the story to a user who can post a piece", function() {
  authenticateSession();
  currentSession().set('content', {user_id: 2});

  visit('/stories/1').then(function() {
    equal(find('.story h2').text(), "My first story");
    equal($.trim(find('.last-piece').text()), 'This is the start of the second story');
    equal($.trim(find(".next-action").text()), 'Create Piece');
  });
});
