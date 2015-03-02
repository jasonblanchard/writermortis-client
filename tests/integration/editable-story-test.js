import Ember from 'ember';
import startApp from 'writermortis/tests/helpers/start-app';
import Pretender from 'pretender';
import storiesFixtures from 'writermortis/tests/helpers/stories-fixtures';
import userFixtures from 'writermortis/tests/helpers/user-fixtures';
import pieceFixture from 'writermortis/tests/helpers/piece-fixture';
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
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test("Should show the story to an anon user", function() {
  invalidateSession();
  visit('/stories/2').then(function() {
    equal($.trim(find('.story h2').text()), "Second Story");
    equal($.trim(find('.last-piece').text()), 'there was a little cat named hamburger');
    equal($.trim(find(".next-action").text()), 'Sign in the add to this story!');
    equal($.trim(find('.piece-stats h2').text()), '2 / 6 Pieces');
  });
});

test("Should show the story to user who posted last piece", function() {
  authenticateSession();
  currentSession().set('currentUser', Ember.Object.create({id: "1"}));

  visit('/stories/2').then(function() {
    equal(/Second Story/.test($.trim(find('.story h2').text())), true);
    equal($.trim(find('.last-piece').text()), 'there was a little cat named hamburger');
    equal($.trim(find(".next-action").text()), 'You added the last piece!');
    equal(find('.delete-story').text(), "Delete");
  });
});

test("Should show the story to a user who can post a piece", function() {
  authenticateSession();
  currentSession().set('content', {user_id: 2});

  visit('/stories/1').then(function() {
    equal($.trim(find('.story h2').text()), "My first story");
    equal($.trim(find('.last-piece').text()), 'This is the start of the second story');
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
    equal($.trim(find(".next-action").text()), 'You added the last piece!');
    equal(/lucille@example.com/.test(find('.participants').text()), true);
  });

});
