'use strict';
let koa       = require('koa'),
    router    = require('koa-router'),
    serve     = require('koa-static'),
    views     = require('co-views'),
    compress  = require('koa-compress'),
    bluebird  = require('bluebird'),
    marko     = require('marko');

let app = koa();

let render = views(__dirname + '/views/');

app.use(compress(
  {
    flush: require('zlib').Z_SYNC_FLUSH
  }
));

app.use(serve(__dirname + '/public'));

app.use(router(app));

// Promise Example
function getShoppingCart(){
  let delay, data;
  delay = 3500; 
  data = {
    items: [
      {
        title: 'Ear Muffs', 
        description: 'Super soft ear muffs to keep you warm', 
        price: 20, 
        qty: 2
      },
      {
        title: 'Socks', 
        description: 'Premium Fluffy Socks', 
        price: 12, 
        qty: 1
      },
      {
        title: 'Parrot AR Drone 2', 
        description: 'Remote control quadricopter controlled by smartphone', 
        price: 10, 
        qty: 1
      }
    ],
    total: 62
  };
  return bluebird.delay(delay).then(function(){
    return data;
  });
}
// Thunk example
function getAdvertisements(){
  let delay, data;
  delay = 1500;
  data = {
    items: [
      {
        title: 'Get 6 pack abs in 3 minutes / day',
        url: 'www.3minute6packabs.com',
        description: 'You can seriously get 6 pack abs in just 3 minutes / day'
      },
      {
        title: 'Get 6 pack abs in 2 minutes / day',
        url: 'www.2minute6packabs.com',
        description: 'Now you can get 6 pack abs in just 2 minutes / day'
      }, 
      {
        title: 'Get 6 pack abs in 1 minutes / day',
        url: 'www.1minute6packabs.com',
        description: 'Now you can get 6 pack abs in just 1 minutes / day'
      },
      {
        title: 'Get 6 pack abs in 30 seconds / day',
        url: 'www.30second6packabs.com',
        description: 'Now you can get 6 pack abs in just 30 seconds / day'
      }
    ]
  };
  return function(done){
    setTimeout(function(){
      done(null, data);
    }, delay)
  }
}

app.get('/marko', function *(){

  let data = {
    shoppingCartProvider: getShoppingCart(),
    adProvider: getAdvertisements()
  };
  this.body = marko.load('./views/index.marko').stream(data);
  this.type = 'text/html';

});

app.get('/jade', function *(){

  let data = yield {
    shoppingCartProvider: getShoppingCart(),
    adProvider: getAdvertisements()
  };
  this.body = yield render('index.jade', data);

});

app.listen(3000);