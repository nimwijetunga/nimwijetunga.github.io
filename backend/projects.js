const appendQuery = require('append-query')
const request = require('request-promise');

require('dotenv').config();

var projects = {
    'PresentEasy': 'Present Easy',
    'Infinity': 'Infinity',
    'StudySpace': 'Study Space',
    'Princeton-Algorithms-Part-1': 'Princeton Algorithms'
};

async function get_profile() {

    let uri = 'https://api.github.com/user/repos';

    let params = {
        access_token: process.env.github_key
    };

    let url = appendQuery(uri, params);

    return request({
        "method": "GET",
        "uri": url,
        "json": true,
        "headers": {
            'User-Agent': 'Personal-Website'
        },
    });
}

module.exports = {
    get_projects: async function () {
        var profile = await get_profile().catch((err) => {return err});
        var projects_filt = {};
        projects_filt['projects'] = []
        var keys = Object.keys(projects);
        for (var i in profile) {
            let name = profile[i]['name'];
            if (keys.includes(name)) {
                let project = {
                    name: projects[name],
                    desc: profile[i]['description'],
                    url: profile[i]['html_url'],
                    img: 'res/' + name + '.png'
                };
                projects_filt['projects'].push(project);
            }
        }
        return new Promise((resolve, reject) => {
            
            if(!projects_filt || !projects_filt['projects'] || projects_filt['projects'].length != 4){
                reject(false);
            }
            resolve(projects_filt);
        })
    }
}