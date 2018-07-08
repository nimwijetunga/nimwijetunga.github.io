const express = require('express');
const app = express();

require('dotenv').config();


app.use(express.static('./frontend'))

app.set('port', (process.env.PORT || 3000));

app.listen(3000, () => console.log('App started on port: ' + app.get('port')))

