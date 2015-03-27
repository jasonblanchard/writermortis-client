import Ember from 'ember';
import startApp from 'writermortis/tests/helpers/start-app';
import Pretender from 'pretender';
import storiesFixtures from 'writermortis/tests/helpers/stories-fixtures';
import userFixtures from 'writermortis/tests/helpers/user-fixtures';
import pieceFixture from 'writermortis/tests/helpers/piece-fixture';
import mockResponse from 'writermortis/tests/helpers/mock-response';
import storyFixture from 'writermortis/tests/fixtures/finished-story-fixture';

var App;
var server;

module('Integration - editable story', {
  setup: function() {
    App = startApp();

    server = new Pretender(function() {
      this.get("/api/v1/stories", function(request) {
        return mockResponse.ok(storiesFixtures);
      });

      this.get("/api/v1/users/1", function(request) {
        return mockResponse.ok(userFixtures.jason);
      });

      this.delete("/api/v1/stories/3", function(request) {
        return [204, { 'Content-Type': 'application/json' }, JSON.stringify({})];
      });

      this.get("/api/v1/stories/3", function(request) {
        return mockResponse.ok(storyFixture);
      });
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('It shows a finished story', function() {
  visit('/stories/3').then(function() {
    equal($.trim(find('.finished-story h2').text()), "A Short Story");
    equal(/This is the beginning\./.test(find('.finished-story .story').text()), true);
    equal(/And this is the end\./.test(find('.finished-story .story').text()), true);
    equal(find('.piece-stats h2').text(), '2 / 2 Pieces');
    equal(/lucille/.test(find('.participants').text()), true);
    equal(/jason/.test(find('.participants').text()), true);
  });
});

test("The owner can delete it", function() {
  authenticateSession();
  currentSession().set('content', {user_id: 1});

  visit('/stories/3');
  click('.delete-story');

  andThen(function() {
     equal(currentRouteName(), 'stories.index');
     equal(/My first story/.test(find('body').text()), false);
  });
});
