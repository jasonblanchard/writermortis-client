import {
  formattedText
} from 'writermortis/helpers/formatted-text';

module('FormattedTextHelper');

// Replace this with your real tests.
test('it works', function() {
  var result = formattedText(42);
  equal(result.string, '42');
});

test('it turns line breaks into <br /> tags', function() {
  var result = formattedText('First line\n\rSecond line');
  equal(result, 'First line<br />Second line');
});
