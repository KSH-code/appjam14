const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

const routers = require('./routers/index')(app);
const controllers = require('./controllers/index')(app);
app.listen(4994);