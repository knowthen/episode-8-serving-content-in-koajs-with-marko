'use strict';
let koa       = require('koa'),
    parse     = require('co-body'),
    colors    = require('colors'),
    path      = require('path'),
    thunkify  = require('thunkify'),
    marko     = require('marko');

require('co-mocha');

let app = koa();

let templateCache = {};

function getTemplate(file){
  let template;
  if(!(file in templateCache)){
    template = templateCache[file] = marko.load(file);
    template.render = thunkify(template.render);
  }
  return template;
}


function *render(fileName, data){
  let baseDir, file, template, result;

  baseDir = __dirname + '/marko/';

  file = path.join(__dirname, 'marko', fileName + '.marko');
  template = getTemplate(file);

  result = yield template.render(data);
  return result[0];
}

app.use(function *controller(){

  let fileName, doLog, data, body;

  fileName = this.get('markoFile');
  
  doLog = this.get('doLog');
  
  data = yield parse(this);
  body = yield render(fileName, data);

  if(doLog === "true"){
    console.log(body.blue.bgWhite);
  }

  this.body = body; 

});

module.exports = app;