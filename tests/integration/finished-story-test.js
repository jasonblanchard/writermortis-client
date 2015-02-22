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
    equal(/lucille@example.com/.test(find('.participants').text()), true);
    equal(/jason@example.com/.test(find('.participants').text()), true);
  });
});
