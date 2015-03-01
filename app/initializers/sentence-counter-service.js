export function initialize(container, application) {
  application.inject('controller:story', 'sentenceCounterService', 'service:sentence-counter');
}

export default {
  name: 'sentence-counter-service',
  initialize: initialize
};
