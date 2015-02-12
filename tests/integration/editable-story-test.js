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
        return mockResponse.ok(userFixtures);
      });
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test("Should show the last piece to anon user", function() {
  visit('/stories/2').then(function() {
    equal(find('.story h2').text(), "Second Story");
    equal($.trim(find('.last-piece').text()), 'there was a little cat named hamburger');
  });
});
