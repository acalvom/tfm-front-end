const express = require('express');
const path = require('path');
const app = express();

const PATH_PROJECT = '/dist/tfm-front-end';

app.use(express.static(__dirname + PATH_PROJECT));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname +
    '/dist/tfm-front-end/index.html'));});

app.listen(process.env.PORT || 8080, () => {
  if (!process.env.PORT) {
    console.log('Running with Express... http://localhost:8080/');
  }
});
