const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  user : {
    type : Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  token :{
    type: String,
    required: true
  }
})

module.exports = mongoose.model('UserToken', userSchema);