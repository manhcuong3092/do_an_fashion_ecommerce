const app = require('./app')

const server = app.listen(process.env.PORT, () => {
  console.log(`Server start on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})