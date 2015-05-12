import Ember from 'ember';
import MarkdownIt from 'npm:markdown-it';
import emoji from 'npm:markdown-it-emoji';


export function formattedText(input) {

  var md = new MarkdownIt();
  md.use(emoji);

  if (input !== undefined) {
    return md.render(input);
  } else {
    return input;
  }
}

export default Ember.Handlebars.makeBoundHelper(formattedText);
