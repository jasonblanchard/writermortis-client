# Writermortis

A super weird writing game.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Using https://github.com/ember-cli/ember-cli-deploy.

#### Prereqs
- make sure you have AWS credentials stored on `config/s3.json`. 
- update `config/deploy.js` with the redis info. Right now, this is using a redistogo instance set up with the `writermortis-realtime` heroku app (TODO: Give this its own redis instance!).
- set up an S3 bucket to hold the assets
- configure asset fingerprint prepend in `Brocfile.js`
- configure `writermortis-server` to pull `index.html` form the `writermortis:current` key in redis. This will server all the assets from the S3 bucket (via the fingerprint prepend) on the same host as `writermortis-server`

#### To deploy
- `ember deploy --environment production` - Compiles in `dist` and uploads to S3
- `ember deploy:list --environment production` - Lists revisions that are in redis and shows which one is active
- `ember deploy:activate --revision ember-deploy:44f2f92 --environment production` - change revision to the one you want to deploy. This will tell the app to serve the `index.html` content from redis based on a specific revision, usually the most recent one.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

