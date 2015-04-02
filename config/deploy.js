var aws = require('./s3.json');

module.exports = {
  development: {
    buildEnv: 'production',
    store: {
      type: 'redis',
      host: 'localhost',
      port: 6379
    },
    assets: {
      type: 's3',
      gzip: false,
      accessKeyId: aws.AWSAccessKeyId,
      secretAccessKey: aws.AWSSecretKey,
      bucket: 'writermortis'
    }
  }
};
