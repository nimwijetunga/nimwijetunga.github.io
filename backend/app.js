const express = require('express');
const app = express();
const projects = require('./projects.js');
const default_data = require('./default_projects.json');
const bodyParser = require('body-parser');

async function send_profile(req, res) {
    if(!req || !req.body) return default_data;
    var project_names = req.body;
    var project_list = await projects.get_projects(project_names).catch((err) => {
        return default_data;
    });
    if (!project_list) {
        res.send({ data: false });
    } else {
        project_list['data'] = true;
        res.send(JSON.stringify(project_list));
    }
}


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())

app.use(express.static('./docs', {
    extensions: ['html', 'htm']
}))

app.set('port', (process.env.PORT || 3000));

app.post('/api/portfolio', [send_profile]);

app.listen(3000, () => console.log('App started on port: ' + app.get('port')))