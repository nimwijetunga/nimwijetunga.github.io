const express = require('express');
const app = express();
const projects = require('./projects.js');
const default_data = require('./default_projects.json');


require('dotenv').config();

async function send_profile(req, res) {
    var project_list = await projects.get_projects().catch((err) => {
        return default_data;
    });
    if(!project_list){
        res.send({data:false});
    }else{
        project_list['data'] = true;
        res.send(JSON.stringify(project_list));
    }
}


app.use(express.static('./frontend'))

app.set('port', (process.env.PORT || 3000));

app.get('/api/portfolio', [send_profile])

app.listen(3000, () => console.log('App started on port: ' + app.get('port')))

