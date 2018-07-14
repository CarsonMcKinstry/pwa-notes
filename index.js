const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 8080;

const buildPath = path.resolve(__dirname, './build');

app.use(express.static(buildPath));

app.listen(port, () => console.log(`Listening on port ${port}`));
