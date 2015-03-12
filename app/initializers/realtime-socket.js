import ENV from 'writermortis/config/environment';

export function initialize(container) {
  console.log("setting up socket connection");

  var store = container.lookup('store:main');
  var socket = io.connect(ENV.writermortisRealtimeHost);

  socket.on("rt-change", function(rawMessage){
    console.log(rawMessage);
    // Wait a tick to let Ember data update the store to avoid duplicate records
    setTimeout(function() {
      var action = rawMessage.realtime_payload.action;
      var type = rawMessage.realtime_payload.resource;
      var data = rawMessage.realtime_payload.data;
      if (action === 'create') {
        store.pushPayload(type, data);
      } else if (action === 'destroy') {
        store.find(type, data[type].id).then(function(resource) {
          resource.unloadRecord();
        });
      }
    }, 100);
  });
}

export default {
  name: 'realtime-socket',
  after: 'store',
  initialize: initialize
};
