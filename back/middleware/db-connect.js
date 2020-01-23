const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:drajaAIcMabWuIkV@easycrm-cluster-aqzdv.mongodb.net/easycrm-db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


module.exports = mongoose.connection;
