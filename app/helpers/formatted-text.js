import Ember from 'ember';
import marked from 'npm:marked';

export function formattedText(input) {

  if (input !== undefined) {
    marked.setOptions({
      sanitize: true,
      gfm: true,
      breaks: true
    });
    return marked(input);
  } else {
    return input;
  }
}

export default Ember.Handlebars.makeBoundHelper(formattedText);
