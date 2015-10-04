var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^the.*$/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id"  : "57262a5d2ff09251b2352465b0",
    "text"    : "<3",
    "attachments" : [
      {
        "type"  : "image",
        "url"   : "http://www1.pictures.stylebistro.com/gi/End+Love+Portraits+2012+Sundance+Film+Festival+PfeRw4FWUjYx.jpg"
      }
    ]
  };

  console.log('sending image to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

while(true) {
  d = new Date();
  if ((d.getMinutes() == '00') && (d.getSeconds() == '00')){
    respond();
  }  
}

exports.respond = respond;