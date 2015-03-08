import Ember from 'ember';
import startApp from 'writermortis/tests/helpers/start-app';
import Pretender from 'pretender';
import storiesFixtures from 'writermortis/tests/helpers/stories-fixtures';
import userFixtures from 'writermortis/tests/helpers/user-fixtures';
import storyFixture from 'writermortis/tests/helpers/story-fixture';
import pieceFixture from 'writermortis/tests/helpers/piece-fixture';
import mockResponse from 'writermortis/tests/helpers/mock-response';

var App;
var server;

module('Integration - create a story', {
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

      this.post("/api/v1/stories", function(request) {
        return mockResponse.ok(storyFixture);
      });

      this.post("/api/v1/pieces", function(request) {
        return mockResponse.ok(pieceFixture);
      });
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test("Should allow a logged in user to create a story", function() {
  authenticateSession();
  currentSession().set('currentUser', Ember.Object.create({id: "1"}));

  visit('/stories/new');
  fillIn("[name='title']", "Great New Story");
  fillIn("[name='total-pieces']", 3);
  fillIn("[name='max-sentences']", 2);
  fillIn("[name='first-piece']", "And then it all got crazy");
  click("[type='submit']");

  andThen(function() {
    equal(/Great New Story/.test(find('.story h2').text()), true);
  });
});

test("It runs validations", function() {
  authenticateSession();
  currentSession().set('currentUser', Ember.Object.create({id: "1"}));

  visit('/stories/new');
  click("[type='submit']");

  andThen(function() {
    equal($.trim(find('.form-group.title .errors').text()), "can't be blank");
    equal($.trim(find('.form-group.first-piece .errors').text()), "can't be blank");
  });
});

test("Should redirect to login for anon users", function() {
  invalidateSession();

  visit('/stories/new').then(function() {
    equal(find('label[for="identification"]').text(), 'Login');
  });
});
