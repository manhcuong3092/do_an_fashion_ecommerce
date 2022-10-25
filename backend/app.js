const express = require('express')
const app = express();

const dotenv = require('dotenv')
dotenv.config({path: '.env'})

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')

var cors = require('cors')

const corsConfig = {
  origin: true,
  credentials: true,
};
//Enable cors

app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));

app.use(cors(corsConfig));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(fileUpload());


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
const cartRoute = require('./routes/cartRoute');
const statisticRoute = require('./routes/statisticRoute');

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
app.use('/api/v1', cartRoute);
app.use('/api/v1', statisticRoute);


// Midlleware to handle error
app.use(errorMiddleware)

module.exports = app;