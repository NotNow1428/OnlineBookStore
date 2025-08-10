const express = require('express');
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, updatedBook, deleteBook, searchBooks } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();



// Post a book
router.post("/create-book", verifyAdminToken, postABook);

// Get all books
router.get("/", getAllBooks);

// Search books
router.get('/search', searchBooks);

// Get single book
router.get("/:id", getSingleBook);

// Update book
router.put("/edit/:id", verifyAdminToken, updatedBook);

// Delete book
router.delete("/:id", verifyAdminToken, deleteBook);

module.exports = router;