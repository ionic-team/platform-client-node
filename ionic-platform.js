
module.exports = function(appId, apiKey) {
  var push = require('./lib/push')(appId, apiKey);

  return {
    Push: push
  }
};
