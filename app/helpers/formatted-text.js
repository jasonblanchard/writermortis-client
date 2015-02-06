import Ember from 'ember';

export function formattedText(input) {
  if (input !== undefined) {
    return input.replace(/\n\r?/g, '<br />').htmlSafe();
  } else {
    return input;
  }
}

export default Ember.Handlebars.makeBoundHelper(formattedText);
