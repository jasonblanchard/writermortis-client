import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('editable-story-viewer', 'EditableStoryViewerComponent', {
  // specify the other units that are required for this test
  needs: ['helper:formatted-text', 'helper:liquid-with', 'view:liquid-with', 'view:liquid-child', 'template:liquid-with', 'helper:with-apply']
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
