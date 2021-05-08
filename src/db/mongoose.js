const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log('connected to db:', process.env.DB_CONNECTION)
}).catch(error => {
  console.error(error);
});