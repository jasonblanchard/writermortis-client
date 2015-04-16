import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('service:sentence-counter', 'SentenceCounterService', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('it returns a sentence count', function(assert) {
  var service = this.subject();
  var text = "This. Has! Three sentences.";
  assert.equal(service.count(text), 3);
});
