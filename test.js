var argv = process.argv;

var IonicPlatform = require('./ionic-platform')(argv[2], argv[3]);
var IonicPush = IonicPlatform.Push;

(function() {

  IonicPush.send([argv[4]], {
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
  });

})();
