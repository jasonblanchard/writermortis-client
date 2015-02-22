import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['rules', 'sentence-count', 'sub'],

  currentSentenceCount: Ember.computed.alias('currentPieceSentenceCount'),

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
