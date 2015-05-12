import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';
import mockResponse from 'writermortis/tests/helpers/mock-response';
import userFixtures from 'writermortis/tests/fixtures/user-fixtures';
import storiesFixtures from 'writermortis/tests/fixtures/stories-fixtures';

var application;

module('Acceptance: Registrations', {
  beforeEach: function() {
    application = startApp();

    var server = new Pretender(function() {
      this.get("/api/v1/stories", function(request) {
        return mockResponse.ok(storiesFixtures);
      });

      this.post('/api/v1/registrations', function(request) {
        var requestParams = JSON.parse(request.requestBody);
        if (requestParams.registration.password_confirmation === 'nonsense') {
          return [422, { 'Content-Type': 'application/json' }, JSON.stringify({errors: {password_confirmation: ["doesn't match Password"]}})];
        } else {
          return mockResponse.ok(userFixtures.jason);
        }
      });

      this.get('/api/v1/users/1', function(request) {
        return mockResponse.ok(userFixtures.jason);
      });

      this.post('/users/sign_in', function(request) {
        return[201, {'Content-Type': 'application/json' }, JSON.stringify({"user_token":"10R-3Vpj-RDwHyqTyeWgo6","user_email":"jason@example.com","user_id":1})];
      });
    });
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Shows errors when failed validation', function(assert) {
  visit('/users/register');
  fillIn('#username', 'test');
  fillIn('#email', 'test@example.com');
  fillIn('#password', 'testpass');
  fillIn('#password-confirmation', 'nonsense');
  click("[type='submit']");

  andThen(function() {
    assert.equal(find(".errors.password-confirmation").text(), "doesn't match Password");
  });
});

test('Redirects and logs in on success', function(assert) {
  invalidateSession();
  visit('/users/register');
  fillIn('#username', 'jason');
  fillIn('#email', 'jason@example.com');
  fillIn('#password', 'testpass');
  fillIn('#password-confirmation', 'testpass');
  click("[type='submit']");

  andThen(function() {
    assert.equal(currentRouteName(), 'stories.index');
    andThen(function() {
      assert.equal(find('.current-user').text(), userFixtures.jason.user.email);
    });
  });
});
