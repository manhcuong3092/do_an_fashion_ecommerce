const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hãy nhập tên danh mục.'],
    trim: true,
    unique: true,
    maxLength: [100, 'Tên danh mục không quá 100 ký tự']
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
  },
});


categorySchema.pre('save', async function (next) {
  if (!this.isModified('name')) {
    next();
  }
  const slug = require('slug');
  console.log(this.name);
  this.slug = `${slug(this.name)}`
});


categorySchema.pre('findByIdAndUpdate', async function (next) {
  if (!this.isModified('name')) {
    next();
  }
  const slug = require('slug');
  this.slug = `${slug(this.name)}`
})


module.exports = mongoose.model('Category', categorySchema);