import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from 'writermortis/tests/helpers/start-app';
import Pretender from 'pretender';
import storiesFixtures from 'writermortis/tests/fixtures/stories-fixtures';
import userFixtures from 'writermortis/tests/fixtures/user-fixtures';
import pieceFixture from 'writermortis/tests/fixtures/piece-fixture';
import storyFixture from 'writermortis/tests/fixtures/story-fixture';
import mockResponse from 'writermortis/tests/helpers/mock-response';

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

      this.get("/api/v1/users/2", function(request) {
        return mockResponse.ok(userFixtures.lucille);
      });
      this.post("/api/v1/pieces/", function(request) {
        return mockResponse.ok(pieceFixture);
      });
      this.delete("/api/v1/stories/2", function(request) {
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
  afterEach: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test("Should show the story to an anon user", function(assert) {
  invalidateSession();
  visit('/').then(function() {
    visit('/stories/2').then(function() {
      assert.equal($.trim(find('.story h2').text()), "Second Story");
      assert.equal($.trim(find('.last-piece').text()), '<p>there was a little cat named hamburger</p>');
      assert.equal($.trim(find(".next-action").text()), 'Sign in the add to this story!');
      assert.equal($.trim(find('.piece-stats h2').text()), '2 / 6 Pieces');
    });
  });
});

test("Should show the story to user who posted last piece", function(assert) {
  authenticateSession();
  currentSession().set('currentUser', Ember.Object.create({id: "2"}));

  visit('/stories/2').then(function() {
    assert.equal(/Second Story/.test($.trim(find('.story h2').text())), true);
    assert.equal($.trim(find('.last-piece').text()), 'there was a little cat named hamburger');
    assert.equal(/You added the last piece!/.test(find(".next-action").text()), true);
    assert.equal(/Undo/.test(find(".next-action").text()), true);
  });
});

test("Should show the story to a user who can post a piece", function(assert) {
  invalidateSession();
  authenticateSession();
  currentSession().set('currentUser', Ember.Object.create({id: "1"}));

  visit('/stories/2').then(function() {
    assert.equal(/Second Story/.test($.trim(find('.story h2').text())), true);
    assert.equal($.trim(find('.last-piece').text()), 'there was a little cat named hamburger');
    assert.equal($.trim(find(".next-action button").text()), 'Create Piece');
  });
});

test("Should allow user who can post a piece to add a piece", function(assert) {
  Ember.run(function() {
    var user = App.__container__.lookup('store:main').createRecord('user');
    user.set('id', 1);
    authenticateSession();
    currentSession().set('currentUser', user);
    
    visit('/stories/2');
    fillIn('.new-piece', "And then it all got crazy");
    click('button.submit');

    andThen(function() {
      assert.equal($.trim(find('.last-piece').text()), 'And then it all got crazy');
      assert.equal($.trim(find('.piece-stats h2').text()), '3 / 6 Pieces');
      assert.equal($.trim(find('.progress').text()), '50% Complete');
      assert.equal(/You added the last piece!/.test(find(".next-action").text()), true);
      assert.equal(/Undo/.test(find(".next-action").text()), true);
      assert.equal(/lucille/.test(find('.participants').text()), true);
    });
  });
});

test("Show allow the user who posted a piece to undo it", function(assert) {
  Ember.run(function() {
    var user = App.__container__.lookup('store:main').createRecord('user');
    user.set('id', 1);
    authenticateSession();
    currentSession().set('currentUser', user);

    visit('/stories/2');
    fillIn('.new-piece', "And then it all got crazy");
    click('button.submit');

    andThen(function() {
      click('button.undo-new-piece').then(function() {
        assert.equal($.trim(find('.last-piece').text()), 'there was a little cat named hamburger');
        assert.equal($.trim(find('.new-piece').val()), 'And then it all got crazy');
        assert.equal($.trim(find('.piece-stats h2').text()), '2 / 6 Pieces');
      });
    });
  });
});

test("Owner can destroy story", function(assert) {

  Ember.run(function() {
    var user = App.__container__.lookup('store:main').createRecord('user');
    user.set('id', 1);
    authenticateSession();
    currentSession().set('currentUser', user);

    visit('/stories/2');
    click('.delete-story');

    andThen(function() {
      assert.equal(currentRouteName(), 'stories.index');
      assert.equal(/My first story/.test(find('body').text()), false);
    });
  });
});
