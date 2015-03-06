export function initialize(container, application) {
  application.inject('controller', 'sentenceCounterService', 'service:sentence-counter');
  container.register('service:sentence-counter', 'sentenceCounterService');
  container.injection('model', 'sentenceCounterService', 'service:sentence-counter');
}

export default {
  name: 'sentence-counter-service',
  initialize: initialize
};
