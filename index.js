/* eslint-disable */
const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 8080;

const buildPath = path.resolve(__dirname, './build');

app.use(express.static(buildPath));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './build/index.html'), (err) => { 
    if (err) {
      res.status(500).send(err)
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
