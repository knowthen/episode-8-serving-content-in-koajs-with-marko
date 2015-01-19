'use strict';
let koa       = require('koa'),
    parse     = require('co-body'),
    path      = require('path'),
    marko     = require('marko');

require('co-mocha');

let app = koa();

app.use(function *controller(){

  let fileName, doLog, data, body;

  fileName = this.get('markoFile');
  fileName = path.join(__dirname, 'marko', fileName + '.marko');

  doLog = this.get('doLog');
  
  data = yield parse(this);

  this.body = marko.load(fileName).stream(data);
  this.type = 'text/html';

});

module.exports = app;