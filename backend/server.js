const app = require('./app')
const connectDatabase = require('./config/database')

//Connect db
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server start on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})

//Handle UnhandlePromise rejection
process.on('unhandledRejection', err => {
  console.log(`ERROR: ${err.message}`);
  console.log('Shutting down the server due to handle promise rejection');
  server.close(() => {
    process.exit(1)
  })
})

//Handle Uncaught exception
process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down the server due to handle uncaught exception');
  server.close(() => {
    process.exit(1)
  })
})
