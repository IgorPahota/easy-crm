const mongoose = require('mongoose');
let url = process.env.URL_DB
mongoose.connect(`${url}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('db connected');
}).catch((e) => {
  console.log(`db error ${e}`);
});


module.exports = mongoose.connection;
