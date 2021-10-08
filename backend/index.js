'use strict'
const express = require('express');
const cors = require('cors');
const config = require('./config');
const datamodelRoutes = require('./routes/datamodel-routes')

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use('/api', datamodelRoutes.routes);

app.listen(config.port, ()=> console.log('App is listening on url http://localhost' + config.port));