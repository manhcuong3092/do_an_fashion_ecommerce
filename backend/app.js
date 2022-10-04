const express = require('express')
const app = express();

const dotenv = require('dotenv')
dotenv.config({path: '.env'})

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const errorMiddleware = require('./middlewares/errors');
const sizeRoute = require('./routes/sizeRoute');
const colorRoute = require('./routes/colorRoute');
const categoryRoute = require('./routes/categoryRoute');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

app.get('/', (req, res, next) => {
  res.status(200).send('It work!')
})

app.use('/api/v1', sizeRoute);
app.use('/api/v1', colorRoute);
app.use('/api/v1', categoryRoute);

// Midlleware to handle error
app.use(errorMiddleware)

module.exports = app;