const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI, { //DB_LOCAL_URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(con => {
    console.log(`MongoDB database connected with Host: ${con.connection.host}`);
  })
}

module.exports = connectDatabase