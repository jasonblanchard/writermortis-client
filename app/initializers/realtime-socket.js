import ENV from 'writermortis/config/environment';

export function initialize(container) {

  var store = container.lookup('store:main');
  var socket = io.connect(ENV.writermortisRealtimeHost);

  socket.on("rt-change", function(rawMessage){
    // Wait a tick to let Ember data update the store to avoid duplicate records
    setTimeout(function() {
      var action = rawMessage.realtime_payload.action;
      var type = rawMessage.realtime_payload.resource;
      var data = rawMessage.realtime_payload.data;
      if (action === 'create') {
        store.pushPayload(type, data);
      } else if (action === 'destroy') {
        var resources = store.all(type);
        var resource = resources.filterBy('id', String(data[type].id)).get('firstObject');

        if (resource !== undefined) {
          resource.unloadRecord();
        }
      }
    }, 100);
  });
}

export default {
  name: 'realtime-socket',
  after: 'store',
  initialize: initialize
};
