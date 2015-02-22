import ENV from 'writermortis/config/environment';

export function initialize(container) {
  console.log("setting up socket connection");

  var store = container.lookup('store:main');
  var socket = io.connect(ENV.writermortisRealtimeHost);

  socket.on("rt-change", function(rawMessage){
    console.log(rawMessage);
    if (rawMessage.action === 'create') {
      var type = rawMessage.resource;
      store.pushPayload(type, rawMessage.data);
    }
  });
}

export default {
  name: 'realtime-socket',
  after: 'store',
  initialize: initialize
};
