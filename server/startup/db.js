const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
  const db = config.get('db');
  
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => console.log(`Connected to ${db}...`))
    .catch((err) => console.log(err));
}