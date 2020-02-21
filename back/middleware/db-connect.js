const mongoose = require('mongoose');
let url = process.env.URL_DB
let local = 'mongodb+srv://admin:drajaAIcMabWuIkV@easycrm-cluster-aqzdv.mongodb.net/easycrm-db?retryWrites=true&w=majority'
mongoose.connect(local , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('db connected');
}).catch((e) => {
  console.log(`db error ${e}`);
});


module.exports = mongoose.connection;
