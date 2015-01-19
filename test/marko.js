'use strict';
let assert      = require('assert'),
    request     = require('co-supertest'),
    colors      = require('colors'),
    html        = require('html'),
    app         = require('./fixtures/app');

require('co-mocha');

let server = app.listen();

function *testHelper(markoFile, contains, doLog, data){
  data = data || {};
  let response = yield request(server)
    .post('/')
    .set('markoFile', markoFile)
    .send(data)
    .expect(200)
    .expect(contains)
    .end();
  if(doLog){
    let content = html.prettyPrint(response.text, {indent_size: 2});
    console.log(content.blue.bgWhite);
  }
  return response;
}

describe('Marko', function(){

  it('should render a passed variable', function *(){
    let name = 'James';
    yield testHelper('vars', new RegExp(name), true, {name: name});
  });

  it('should escape unsafe content', function *(){
    let userContent, escapedUserContent;
    userContent = '<script>dangerousStuff;</script>';
    // opening angle brackets are escaped, which achieves the 
    // desired effect but is different than usual
    escapedUserContent = '&lt;script>dangerousStuff;&lt;/script>';
    yield testHelper('vars', new RegExp(escapedUserContent), 
      true, {name: userContent});
    
  });

  it('should render a list of websites', function *(){

    let sites = ['knowthen.com', 'google.com', 'twitter.com'];
    yield testHelper('loop', new RegExp(sites[0]), true, {sites: sites});
    yield testHelper('loop', new RegExp(sites[1]), false, {sites: sites});
    yield testHelper('loop', new RegExp(sites[2]), false, {sites: sites});

  });

  it('should render a login anchor', function *(){
    yield testHelper('ifelse', /Login/, true);
  });

  it('should render a login anchor', function *(){
    yield testHelper('ifelse', /Logout/, true, {user: 'James'});
  });

  it('should not show an html comment', function *(){
    let message;
    try{
      yield testHelper('comment', /should not show/, true);
    }
    catch(err){
      message = err.message;
    }
    assert.equal(
      message,
      "expected body '<!--this comment should show-->' to match /should not show/"
    );
  });

  it('should show a marko comment', function *(){
    yield testHelper('comment', /this comment should show/, true);
  });

  it('parent should show default content when rendered', function *(){
    
    yield testHelper('parent', /default content/, true);

  });

  it('child should show its overridden content', function *(){
    
    yield testHelper('child', /child content/, true);

  });

  it('should include the header from a seperate file', function *(){
    
    yield testHelper('include', /Valid HTML/, true);

  });

  it('should render an anchor from a custom macro', function *(){
    
    yield testHelper('macro', /<a href="google.com" class="favorite">/, true);

  });

  it('should render a more comprehensive example', function *(){

    yield testHelper('index', /Pros and Cons of using Marko/, true, {
        title: 'Pros and Cons',
        pros: [
          'streaming',
          'async rendering',
          'out of order rendering',
          'Just HTML',
          'inheritance', 
          'macros',
          'very fast'
        ],
        cons: [
          'a bit verbose',
          'no filters'
        ]
      });

  });

});