"use strict"

require('dotenv').config()

const db = require('database-test-helper')
const progressdb = require('progressdb-test-helper')

db.start().add({progressdb}).init(() => {
  const app = require('./app.local')
  const PORT = process.env.API_PROGRESS_HOST || 3302;
  const httpServer = require('http').createServer(app);
  httpServer.listen(PORT)
  console.log(`\n# Progress-Server is running at http://localhost:${PORT}\n`);
});