"use strict"

const api = require('../api/main')

const DatabaseAbstractor = require("database-abstractor")
const progress = new DatabaseAbstractor();

const DB = {
  HOST: process.env.DB_HOST || 'http://localhost',
  PORT: process.env.DB_PORT || 3001
}

progress.use(require('progressdb-dynamodb-driver')({
  region : 'us-west-2', 
  endpoint : `${DB.HOST}:${DB.PORT}`
}))

api.useDatabase({ progress })

/* create express app from api */
const express = require('express')
const cors = require('cors')

const app = express();

app.use(cors());

app.use('/', api);

module.exports = app;