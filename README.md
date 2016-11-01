# fb-bot

SDK wrapper to verifyRequest, send message, recieve with Facebook Messenger Bots.

[![NPM](https://nodei.co/npm/fb-bot.png?downloads=true&downloadRank=true)](https://www.npmjs.com/package/fb-bot)


## Install

```
$ npm install --save fb-bot
```

# Initializing

[This link](https://github.com/wahengchang/facebook-bot-template) initializing module parameters.
```js

var express = require('express');
var facebookModule = require('fb-bot.js');
var app = express();
    
facebookModule.init({
  APP_SECRET: 'YOUR_APP_SECRET',
  VALIDATION_TOKEN: 'YOUR_VALIDATION_TOKEN',
  PAGE_ACCESS_TOKEN: 'YOUR_PAGE_ACCESS_TOKEN',
  SERVER_URL: 'YOUR_SERVER_UR'
});

app.use(bodyParser.json({ verify: facebookModule.verifyRequestSignature }));
```

## Usage

```js
 ### 2 important funtions
    facebookModule.sendTextMessage(_senderId, _message).then( ... )
    facebookModule.messageListener(data, callback)

```

### Send an Echo message back to user
```js
//Facebook message 
app.post('/webhook', facebookModule.parsePOST, function (req, res) {
  var dataList = req.afterParse ;
  dataList.forEach(function(data){
    facebookModule.messageListener(data, function(){
      facebookModule.sendTextMessage(data.senderId, data.message.text);
    });
  });
  res.sendStatus(200);
});
```

### Send url of attachments back to user
```js
//Facebook message 
app.post('/webhook', facebookModule.parsePOST, function (req, res) {
  var dataList = req.afterParse ;
  dataList.forEach(function(data){
    facebookModule.messageListener(data, function(){
      facebookModule.sendTextMessage(data.senderId, data.message.attachments[0].payload.url);
    });
  });
  res.sendStatus(200);
});
```


## Two import routes
#### Important
 - GET     /webhook
 - POST    /webhook
 -  __**/webhook is default url routes where facebook send verification to**__

```js
##  Verification

app.get('/webhook', facebookModule.authGET, function (req, res, next) {
    res.status(200).send(req.query['hub.challenge']);
});

```

```js
## Recieve Message

app.post('/webhook', facebookModule.parsePOST, function (req, res) {
  var dataList = req.afterParse ;
  dataList.forEach(function(data){
      // ....
  });
  res.sendStatus(200);
});
```


## License


[MIT](http://vjpr.mit-license.org)