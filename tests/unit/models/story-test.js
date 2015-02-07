import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('story', 'Story', {
  // Specify the other units that are required for this test.
  needs: ['model:piece', 'model:user']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
