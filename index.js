/* eslint-disable */
const express = require('express');
const path = require('path');
const http = require('http');

const app = express();

const port = process.env.PORT || 8080;

const buildPath = path.resolve(__dirname, './build');

app.use(function (req, res, next) {
  var sslUrl;

  if (process.env.NODE_ENV === 'production' &&
    req.headers['x-forwarded-proto'] !== 'https') {

    sslUrl = ['https://react-pwa-notes.herokuapp.com', req.url].join('');
    return res.redirect(sslUrl);
  }

  return next();
});

app.use(express.static(buildPath));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './build/index.html'), (err) => { 
    if (err) {
      res.status(500).send(err)
    }
  });
});

http.createServer(app)
  .listen(port, () => console.log(`Listening on port ${port}`));
