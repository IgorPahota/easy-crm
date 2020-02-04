const mongoose = require('mongoose');
const uri = process.env.uri;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('db connected');
}).catch((e) => {
  console.log(`db error ${e}`);
});


module.exports = mongoose.connection;
