import ENV from 'writermortis/config/environment';

export function initialize(container) {
  console.log("setting up socket connection");

  var store = container.lookup('store:main');
  var socket = io.connect(ENV.writermortisRealtimeHost);

  socket.on("rt-change", function(rawMessage){
    console.log(rawMessage);
    if (rawMessage.realtime_payload.action === 'create') {
      var type = rawMessage.realtime_payload.resource;
      store.pushPayload(type, rawMessage.realtime_payload.data);

    }
  });
}

export default {
  name: 'realtime-socket',
  after: 'store',
  initialize: initialize
};
