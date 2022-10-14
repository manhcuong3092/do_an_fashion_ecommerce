const express = require('express')
const app = express();

const dotenv = require('dotenv')
dotenv.config({path: '.env'})

var cors = require('cors')

const corsConfig = {
  origin: true,
  credentials: true,
};
//Enable cors

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')

const errorMiddleware = require('./middlewares/errors');
const sizeRoute = require('./routes/sizeRoute');
const colorRoute = require('./routes/colorRoute');
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const blogRoute = require('./routes/blogRoute');
const contactRoute = require('./routes/contactRoute');
const subscriberRoute = require('./routes/subscriberRoute');
const orderRoute = require('./routes/orderRoute');
const paymentRoute = require('./routes/paymentRoute');

app.use(cors(corsConfig));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(fileUpload());

app.get('/', (req, res, next) => {
  res.status(200).send('It work!')
})

app.use('/api/v1', sizeRoute);
app.use('/api/v1', colorRoute);
app.use('/api/v1', categoryRoute);
app.use('/api/v1', productRoute);
app.use('/api/v1', authRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', blogRoute);
app.use('/api/v1', contactRoute);
app.use('/api/v1', subscriberRoute);
app.use('/api/v1', orderRoute);
app.use('/api/v1', paymentRoute);


// Midlleware to handle error
app.use(errorMiddleware)

module.exports = app;