import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('editable-story-viewer', 'EditableStoryViewerComponent', {
  // specify the other units that are required for this test
  needs: ['helper:formatted-text']
});

/**
 * TODO Fix the liquid-with dependency
test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});
*/
