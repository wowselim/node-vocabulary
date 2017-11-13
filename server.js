const config = require('config');

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.db, { useMongoClient: true });

const bodyParser = require('body-parser');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());

const vocabularyRoute = require('./routes/vocabulary');
app.use('/api', vocabularyRoute);

app.listen(config.port, () => {
    console.log('Server up and running');
});

module.exports = app;
