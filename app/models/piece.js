import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  story: DS.belongsTo('story'),
  user: DS.belongsTo('user'),

  sentenceCount: function() {
    return this.get('sentenceCounterService').count(this.get('text'));
  }.property('text')
});
