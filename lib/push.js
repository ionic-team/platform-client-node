/**
 Push format:

{
  "tokens":[
    "b284a6f7545368d2d3f753263e3e2f2b7795be5263ed7c95017f628730edeaad",
    "d609f7cba82fdd0a568d5ada649cddc5ebb65f08e7fc72599d8d47390bfc0f20"
  ],
  "notification":{
    "alert":"Hello World!",
    "ios":{
      "badge":1,
      "sound":"ping.aiff",
      "expiry": 1423238641,
      "priority": 10,
      "contentAvailable": true,
      "payload":{
        "key1":"value",
        "key2":"value"
      }
    },
    "android":{
      "collapseKey":"foo",
      "delayWhileIdle":true,
      "timeToLive":300,
      "payload":{
        "key1":"value",
        "key2":"value"
      }
    }
  }
}

post_data = YOUR_POST_JSON_OBJECT
app_id = YOUR_APP_ID
private_key = YOUR_PRIVATE_API_KEY
url = 
req = urllib2.Request(url, data=post_data)
req.add_header("Content-Type", "application/json")
req.add_header("X-Ionic-Application-Id", app_id)
b64 = base64.encodestring('%s:' % private_key).replace('\n', '')
req.add_header("Authorization", "Basic %s" % b64)
resp = urllib2.urlopen(req)

USAGE:

var IonicPush = require('ionic-push')(APP_ID, API_KEY);
*/

var request = require('request');

module.exports = function(appId, apiKey) {

  return {
    apiUrl: 'https://push.ionic.io/api/v1/push',
    send: function(tokens, message) {

      message.tokens = tokens;

      var opts = {
        uri: this.apiUrl,
        method: 'POST',
        json: message,
        headers: {
          'X-Ionic-Application-Id': appId,
          'Authorization': new Buffer(apiKey + ':').toString('base64')
        }
      };

      var req = request(opts, function(err, res, body) {
        if(err || res.statusCode != 202) {
          console.error('IonicPush: Error', res.statusCode);
          console.error(err);
        }
        console.log(body);
      });
    }
  }
}
