export function initialize(container, application) {
  application.inject('route', 'sentenceCounterService', 'service:sentence-counter');
  application.inject('controller', 'sentenceCounterService', 'service:sentence-counter');
}

export default {
  name: 'sentence-counter-service',
  initialize: initialize
};
