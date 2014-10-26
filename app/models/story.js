import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  totalPieces: DS.attr('number'),
  maxSentences: DS.attr('number'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  pieces: DS.hasMany('piece')
});
