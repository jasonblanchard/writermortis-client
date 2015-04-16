import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('sentence-counter', 'SentenceCounterComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  assert.equal(component._state, 'inDOM');
});

test('it applies a warning class when it is under', function(assert) {
  var component = this.subject({currentPieceSentenceCount: 3, maxSentences: 4});
  assert.equal(component.get('warningClass'), 'under');
});

test('it applies a warning class when it has none', function(assert) {
  var component = this.subject({currentPieceSentenceCount: 0, maxSentences: 4});
  assert.equal(component.get('warningClass'), 'none');
});

test('it applies a warning class when it is over', function(assert) {
  var component = this.subject({currentPieceSentenceCount: 6, maxSentences: 4});
  assert.equal(component.get('warningClass'), 'over');
});
