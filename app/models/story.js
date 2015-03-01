import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  totalPieces: DS.attr('number', {defaultValue: 6}),
  maxSentences: DS.attr('number', {defaultValue: 3}),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  pieces: DS.hasMany('piece'),
  user: DS.belongsTo('user')
});
