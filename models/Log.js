const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const logSchema = new Schema({
  ipAddress: String,
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  page: {
    method: String,
    url: String
  }
}, {
  timestamps: {
    createdAt: 'dateVisited' // We have a field `dateVisited` set to the current time
  }
});

module.exports = mongoose.model('Log', logSchema);
