import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['rules', 'sentence-count', 'sub'],

  currentSentenceCount: function() {
    var sentences = this.get('text').match(/([^\r\n.!?]+([.!?]+|$))/gim);

    if ( sentences != null ) {
      return sentences.length;
    } else {
      return 0;
    }
  }.property('text'),

  warningClass: function() {
    var count = this.get('currentSentenceCount');

    if (count === 0) {
      return 'none';
    } else if (count <= this.get('maxSentences') ) { 
      return 'under';
    } else {
      return 'over';
    }

  }.property('currentSentenceCount')
});
