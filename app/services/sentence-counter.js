import Ember from 'ember';

export default Ember.Object.extend({
  test: 'asdf',
  count: function(text) {
    if (text === undefined) {
      return 0;
    }
    var sentences = text.match(/([^\r\n.!?]+([.!?]+|$))/gim);

    if (sentences != null) {
      return sentences.length;
    } else {
      return 0;
    }
  }
});
