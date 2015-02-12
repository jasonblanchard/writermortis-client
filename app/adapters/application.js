import DS from 'ember-data';
import ENV from 'writermortis/config/environment';

export default DS.ActiveModelAdapter.extend({
  namespace: 'api/v1'
});

if ( ENV.environment === 'development' ) {
  DS.ActiveModelAdapter.reopen({
    host: "http://localhost:3000"
  });
} else if ( ENV.environment === 'test' ) {
  DS.ActiveModelAdapter.reopen({
    host: ""
  });
}
