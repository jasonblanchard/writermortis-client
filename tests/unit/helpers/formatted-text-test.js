import {
  formattedText
} from 'writermortis/helpers/formatted-text';

import {module, test} from 'qunit';

module('FormattedTextHelper');

test('formats text in markdown', function(assert) {
  var result = formattedText('First line\n\rSecond line');
  assert.equal(/<p>First line<\/p>/.test(result), true);
  assert.equal(/<p>Second line<\/p>/.test(result), true);
});
