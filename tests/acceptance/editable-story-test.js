import Ember from 'ember';
import startApp from 'writermortis/tests/helpers/start-app';
import Pretender from 'pretender';
import storiesFixtures from 'writermortis/tests/helpers/stories-fixtures';
import userFixtures from 'writermortis/tests/helpers/user-fixtures';
import pieceFixture from 'writermortis/tests/helpers/piece-fixture';
import storyFixture from 'writermortis/tests/helpers/story-fixture';
import mockResponse from 'writermortis/tests/helpers/mock-response';

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

      this.get("/api/v1/users/2", function(request) {
        return mockResponse.ok(userFixtures.lucille);
      });
      this.post("/api/v1/pieces/", function(request) {
        return mockResponse.ok(pieceFixture);
      });
      this.delete("/api/v1/stories/1", function(request) {
        return [204, { 'Content-Type': 'application/json' }, JSON.stringify({})];
      });
      this.delete("/api/v1/pieces/138", function(request) {
        return [204, { 'Content-Type': 'application/json' }, JSON.stringify({})];
      });
      this.get("/api/v1/stories/2", function(request) {
        return mockResponse.ok(storyFixture);
      });
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test("Should show the story to an anon user", function() {
  invalidateSession();
  visit('/').then(function() {
    visit('/stories/2').then(function() {
      equal($.trim(find('.story h2').text()), "Second Story");
      equal($.trim(find('.last-piece').text()), 'there was a little cat named hamburger');
      equal($.trim(find(".next-action").text()), 'Sign in the add to this story!');
      equal($.trim(find('.piece-stats h2').text()), '2 / 6 Pieces');
    });
  });
});

test("Should show the story to user who posted last piece", function() {
  authenticateSession();
  currentSession().set('currentUser', Ember.Object.create({id: "2"}));

  visit('/stories/2').then(function() {
    equal(/Second Story/.test($.trim(find('.story h2').text())), true);
    equal($.trim(find('.last-piece').text()), 'there was a little cat named hamburger');
    equal(/You added the last piece!/.test(find(".next-action").text()), true);
    equal(/Undo/.test(find(".next-action").text()), true);
  });
});

test("Should show the story to a user who can post a piece", function() {
  authenticateSession();
  currentSession().set('content', {user_id: 1});

  visit('/stories/2').then(function() {
    equal(/Second Story/.test($.trim(find('.story h2').text())), true);
    equal($.trim(find('.last-piece').text()), 'there was a little cat named hamburger');
    equal($.trim(find(".next-action button").text()), 'Create Piece');
  });
});

test("Should allow user who can post a piece to add a piece", function() {
  authenticateSession();
  currentSession().set('content', {user_id: 2});
  
  visit('/stories/1');
  fillIn('.new-piece', "And then it all got crazy");
  click('button.submit');

  andThen(function() {
    equal($.trim(find('.last-piece').text()), 'And then it all got crazy');
    equal($.trim(find('.piece-stats h2').text()), '2 / 6 Pieces');
    equal($.trim(find('.progress').text()), '33% Complete');
    equal(/You added the last piece!/.test(find(".next-action").text()), true);
    equal(/Undo/.test(find(".next-action").text()), true);
    equal(/lucille/.test(find('.participants').text()), true);
  });
});

test("Show allow the user who posted a piece to undo it", function() {
  authenticateSession();
  currentSession().set('content', {user_id: 2});
  
  visit('/stories/1');
  fillIn('.new-piece', "And then it all got crazy");
  click('button.submit');

  andThen(function() {
    click('button.undo-new-piece').then(function() {
      equal($.trim(find('.last-piece').text()), 'This is the start of the second story');
      equal($.trim(find('.form .new-piece').val()), 'And then it all got crazy');
      equal($.trim(find('.piece-stats h2').text()), '2 / 6 Pieces');
    });
  });
});

test("Owner can destroy story", function() {
  authenticateSession();
  currentSession().set('content', {user_id: 1});

  visit('/stories/1');
  click('.delete-story');

  andThen(function() {
     equal(currentRouteName(), 'stories.index');
     equal(/My first story/.test(find('body').text()), false);
  });
});
