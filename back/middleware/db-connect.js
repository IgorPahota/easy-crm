const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:drajaAIcMabWuIkV@easycrm-cluster-aqzdv.mongodb.net/easycrm-db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('db connected');
}).catch((e) => {
  console.log(`db error ${e}`);
});


module.exports = mongoose.connection;
