/* eslint-disable */
const express = require('express');
const path = require('path');
const http = require('http');
var enforce = require('express-sslify');

const app = express();

const port = process.env.PORT || 8080;

const buildPath = path.resolve(__dirname, './build');

app.use(express.static(buildPath));
app.use(enforce.HTTPS({ trustProtoHeader: true }))

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './build/index.html'), (err) => { 
    if (err) {
      res.status(500).send(err)
    }
  });
});

http.createServer(app)
  .listen(port, () => console.log(`Listening on port ${port}`));
