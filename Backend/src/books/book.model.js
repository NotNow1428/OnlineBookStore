const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  orderCount: {
    type: Number,
    default: 0
  },
  coverImage: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true
  },
  approved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add text index for search functionality
bookSchema.index({ title: 'text', author: 'text', category: 'text' });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;