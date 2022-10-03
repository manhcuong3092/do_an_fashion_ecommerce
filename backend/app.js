const express = require('express')
const app = express();

const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')
dotenv.config({path: '.env'})

const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

app.get('/', (req, res, next) => {
  res.status(200).send('It work!')
})

module.exports = app;