import DS from 'ember-data';

export default DS.ActiveModelAdapter.extend({
  namespace: 'api/v1'
});

DS.ActiveModelAdapter.reopen({
  host: 'http://localhost:3000'
});
