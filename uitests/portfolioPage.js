var post_url = 'https://nim-wijetunga.lib.id/profilePost@0.1.4/';

let PortfolioPage = {
    delay: function (time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
      },
      
      get_post_req: async function(page) {
        await page.setRequestInterception(true);
        var req = false;
        var res = false;
        page.on('request', request => {
          if (request.url === post_url) {
            req = request;
          }
          request.continue(request.postData);
        });
        page.on('response', async function(response) {
          if (response.url == post_url){
            res = response;
          }
        });
        await this.delay(4000);
        return [req, res];
    },
      
    post_req_type_correct: async function(request) {
        let post_data = request.postData;
        return (typeof post_data != "undefined" && typeof post_data != "object");
    },
      
    has_required_fields: function (projects){
      
        let has_req_fields = projects.every(project => {
          return (typeof project['name'] != "undefined"  && typeof project['desc'] != "undefined" && typeof project['url'] != "undefined"  && typeof project['img'] != "undefined" );
        });
      
        return has_req_fields;
          
    },

    get_project_href: async function(page, selector){
        let href = await page.evaluate((selector) => {
            return document.querySelector(`${selector} .view-proj`).href;
        }, selector);
        return href;
    },

    get_project_title: async function(page, selector){
        let title = await page.evaluate((selector) => {
            return document.querySelector(`${selector} .card-title`).innerText;
        }, selector)
        return title;
    },

    get_img_properties: async function(page, selector){
        let img_properties = await page.evaluate((selector) => {
            let img = document.querySelectorAll("#c1-top .card-img-top")[0];
            return {
                src: img.src,
                height: img.height,
                width: img.width
            };
        }, selector)
        return img_properties;
    }
};

module.exports = PortfolioPage;