export default {
  ok: function(data) {
    return [200, { 'Content-Type': 'application/json' }, JSON.stringify(data)];
  }
};
