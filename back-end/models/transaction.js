const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  username: {
    type: String,
    required : true
  },
  hotel : {
    type: Schema.Types.ObjectId,
    required: true,
    ref : 'Hotel'
  },
  room : [
    {
      type : Number,
      required: true
    }
  ],
  dateStart : {
    type: String,
    required : true
  },
  dateEnd : {
    type: String,
    required: true
  },
  price : {
    type: Number,
    required : true
  },
  payment : {
    type: String,
    required : true
  },
  status : {
    type:  String,
    required: true
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);