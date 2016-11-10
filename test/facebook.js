var should = require('should');


var facebookModule = require('../index.js')
    // validateGET = facebookModule.validateGET,
    // parsePOST = facebookModule.parsePOST;

var testUserId = process.env.TEST_USER_ID;
console.log(' TEST_USER_ID: ', testUserId);

describe('Test init() /module/facebook.js', function() {
  this.timeout(40000);

  it('Test init(), empty input', function(done) {
    facebookModule.init().should.be.eql(false);
    done();
  });

  it('Test init(), missing parameters', function(done) {
    facebookModule.init({APP_SECRET: ''}).should.be.eql(false);
    done();
  });

  it('Test init(), happy path', function(done) {
    facebookModule.init({
      APP_SECRET: process.env.MESSENGER_APP_SECRET,
      VALIDATION_TOKEN: process.env.MESSENGER_VALIDATION_TOKEN,
      PAGE_ACCESS_TOKEN: process.env.MESSENGER_PAGE_ACCESS_TOKEN,
      SERVER_URL: process.env.MESSENGER_SERVER_URL
    }).should.be.eql(true);
    done();
  });
})


describe('Test send message /module/facebook.js', function() {
  this.timeout(40000);

  it('sendTextMessage, happy path', function(done) {

    facebookModule.sendTextMessage(testUserId, 'this is test message').then(function(result){
      console.log(result)
      done();
    },function(err){
      console.log(err)
      done(err);
    })

  });

  it('sendTextMessage, error', function(done) {

    facebookModule.sendTextMessage('testUserId', 'this is test message').then(function(result){
      console.log(result)
      done('expect error');
    },function(err){
      console.log(JSON.stringify(err))
      done();
    })

  });

  it('sendButtonMessage', function(done) {
    var VALIDATION_TOKEN = 'abc;'

    facebookModule.sendButtonMessage(testUserId).then(function(result){
      console.log(result)
      done();
    },function(err){
      console.log(JSON.stringify(err))
      done(err);
    })

  });

  it('sendQuickReply', function(done) {
    var VALIDATION_TOKEN = 'abc;'

    facebookModule.sendQuickReply(testUserId).then(function(result){
      console.log(result)
      done();
    },function(err){
      console.log(JSON.stringify(err))
      done(err);
    })
  });

  describe('listener /module/facebook.js', function() {

    it('listener, match messageType', function(done) {
      facebookModule.listener('a', 'b', 'messageType', 'messageType', function(){
        done();
      })
    });

    it('listener, does not match messageType', function(done) {
      facebookModule.listener('a', 'b', 'c', 'messageType', function(){
        done('should not match messageType');
      })
      done();
    });

    it('listener, does match data.messageType', function(done) {
      facebookModule.listener('a', 'b', 'messageType', {messageType: 'messageType'}, function(){
        done();
      })
    });

    it('listener, does not match data.messageType', function(done) {
      facebookModule.listener('a', 'b', 'c', {messageType: 'messageType'}, function(){
        done('should not match messageType');
      })
      done();
    });
  });



  describe('notListener /module/facebook.js', function() {

    it('notListener, messageType match, should not pass', function(done) {
      facebookModule.notListener('a', 'b', 'messageType', 'messageType', function(){
        done('should not pass');
      })
      done();
    });

    it('notListener, not messageType match, should pass', function(done) {
      facebookModule.notListener('a', 'b', 'c', 'messageType', function(){
        done();
      })
    });

    it('notListener, messageType match, should not pass', function(done) {
      facebookModule.notListener('a', 'b', 'messageType', {messageType: 'messageType'}, function(){
        done('should not pass');
      })
      done();
    });

    it('notListener, not messageType match, should pass', function(done) {
      facebookModule.notListener('a', 'b', 'c', {messageType: 'messageType'}, function(){
        done();
      })
    });
  });

  describe('messageListener /module/facebook.js', function() {
    it('messageListener, messageType match, should not pass', function(done) {
      facebookModule.messageListener('I am taget', function(){
        done();
      })
    });
  });


  describe('getProfile /module/facebook.js', function() {
    it('getProfile', function(done) {
      facebookModule.getProfile(testUserId).then(function(result){
        console.log(result)
        done();
      },function(err){
        done(err);
      })
    });
  });

})

