describe('Portfolio Page Tests', function () {
  let page;
  let req;
  let res;
  let net_stack;

  before(async function () {
    page = await browser.newPage();
    await page.goto('http://localhost:3000/portfolio/portfolio');
    net_stack = await get_post_req(page);
    req = net_stack[0];
    res = net_stack[1];
  });

  after(async function () {
    await page.close();
  })

  it('should have the correct page title', async function () {
    const page_title = await page.title();
    assert.equal(page_title, "Personal Website", `Page title ${page_title} does not match "Portfolio"`);
  });

  it('should make a post request', async function () {
    assert.notEqual(req, false, `Page does not make post request for portfolio data`);
  });

  it('should contain post body of type object', async function () {
    var req_correct = await post_req_type_correct(req);
    assert.equal(req_correct, true, `Page does not make post request with body`);
  });

  it('should contain response with status 200', async function () {
    assert.equal(res.status, 200, `Page post request does not have status 200`);
  });

  it('should contain response body of length 4', async function () {
    var body = JSON.parse(await res.text());
    assert.equal(body.projects.length, 4, `Page does not have response of length 4`);
  });
  
  it('should contain response body with required fields', async function () {
    var body = JSON.parse(await res.text());
    var projects = body['projects'];
    assert.equal(has_required_fields(projects), true, `Response does not contain required fields`);
  });

});

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

async function get_post_req(page) {
  await page.setRequestInterception(true);
  var req = false;
  var res = false;
  page.on('request', request => {
    if (request.url === 'https://nim-wijetunga.lib.id/profilePost@0.1.3/') {
      req = request;
    }
    request.continue(request.postData);
  });
  page.on('response', async function(response) {
    if (response.url == "https://nim-wijetunga.lib.id/profilePost@0.1.3/"){
      res = response;
    }
  });
  await delay(4000);
  return [req, res];
}

async function post_req_type_correct(request) {
  let post_data = request.postData;
  return (typeof post_data != "undefined" && typeof post_data != "object");
}

function has_required_fields(projects){

  let has_req_fields = projects.every(project => {
    return (typeof project['name'] != "undefined"  && typeof project['desc'] != "undefined" && typeof project['url'] != "undefined"  && typeof project['img'] != "undefined" );
  });

  return has_req_fields;
    
}