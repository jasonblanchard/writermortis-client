import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from 'writermortis/tests/helpers/start-app';
import Pretender from 'pretender';
import storiesFixtures from 'writermortis/tests/fixtures/stories-fixtures';
import userFixtures from 'writermortis/tests/fixtures/user-fixtures';
import pieceFixture from 'writermortis/tests/fixtures/piece-fixture';
import mockResponse from 'writermortis/tests/helpers/mock-response';
import storyFixture from 'writermortis/tests/fixtures/finished-story-fixture';

var App;
var server;

module('Acceptance - editable story', {
  beforeEach: function() {
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
  afterEach: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('It shows a finished story', function(assert) {
  visit('/stories/3').then(function() {
    assert.equal($.trim(find('.finished-story h2').text()), "A Short Story");
    assert.equal(/This is the beginning\./.test(find('.finished-story .story').text()), true);
    assert.equal(/And this is the end\./.test(find('.finished-story .story').text()), true);
    assert.equal(find('.piece-stats h2').text(), '2 / 2 Pieces');
    assert.equal(/lucille/.test(find('.participants').text()), true);
    assert.equal(/jason/.test(find('.participants').text()), true);
  });
});

test("The owner can delete it", function(assert) {
  authenticateSession();
  currentSession().set('content', {user_id: 1});

  visit('/stories/3');
  click('.delete-story');

  andThen(function() {
     assert.equal(currentRouteName(), 'stories.index');
     assert.equal(/My first story/.test(find('body').text()), false);
  });
});
