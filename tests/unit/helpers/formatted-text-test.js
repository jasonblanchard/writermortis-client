import {
  formattedText
} from 'writermortis/helpers/formatted-text';

import {module, test} from 'qunit';

module('FormattedTextHelper');

// Replace this with your real tests.
test('it works', function(assert) {
  var result = formattedText(42);
  assert.equal(result.string, '42');
});

test('it turns line breaks into <br /> tags', function(assert) {
  var result = formattedText('First line\n\rSecond line');
  assert.equal(result, 'First line<br />Second line');
});
