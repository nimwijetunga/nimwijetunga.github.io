const PortfolioPage = require('./portfolioPage.js');

var card_selectors = ['#c1-top', '#c2-top', '#c1-bottom', '#c2-bottom'];

describe('Portfolio Page Tests', function () {
  let page;
  let req;
  let res;
  let net_stack;

  before(async function () {
    page = await browser.newPage();
    await page.goto('http://localhost:3000/portfolio/');
    net_stack = await PortfolioPage.get_post_req(page);
    req = net_stack[0];
    res = net_stack[1];
  });

  after(async function () {
    await page.close();
  })

  it('should have the correct page title', async function () {
    const page_title = await page.title();
    assert.equal(page_title, "Portfolio", `Page title ${page_title} does not match "Portfolio"`);
  });

  describe('API Tests, Page', () => {
    xit('should make a post request', async function () {
      assert.notEqual(req, false, `Page does not make post request for portfolio data`);
    });

    xit('should contain post body of type object', async function () {
      var req_correct = await PortfolioPage.post_req_type_correct(req);
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
      assert.equal(PortfolioPage.has_required_fields(projects), true, `Response does not contain required fields`);
    });
  })

  describe('Cards Loaded Tests', () => {
    card_selectors.forEach(selector => {
      describe(`card: ${selector}`, () => {
        it(`should have view project button without empty href`, async function () {
          var href = await PortfolioPage.get_project_href(page, selector);
          assert.isNotEmpty(href, `href : ${href} is empty`);
        })

        it(`should have non-empty title`, async function () {
          var title = await PortfolioPage.get_project_title(page, selector);
          assert.isNotEmpty(title, `Title : ${title} is empty`);
        })

        it(`should have non-empty image src`, async function () {
          var img = await PortfolioPage.get_img_properties(page, selector);
          assert.isNotEmpty(img['src'], `Src: ${img['src']} is empty`);
        })

        it(`should have image height`, async function () {
          var img = await PortfolioPage.get_img_properties(page, selector);
          assert.isTrue(img['height'] > 0, `Height: ${img['height']} was not greater than 0`);
        })

        it(`should have image width`, async function () {
          var img = await PortfolioPage.get_img_properties(page, selector);
          assert.isTrue(img['width'] > 0, `Width: ${img['width']} was not greater than 0`);
        })

      })
    })
  })
});