const mongoose = require('mongoose');
const catSchema = new mongoose.Schema({
  subcategory_name: {
    type: String,
    required: true,
    unique: true
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('SubCategory', catSchema);