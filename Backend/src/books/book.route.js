const express = require('express');
const {
    postABook,
    getAllBooks,
    getSingleBook,
    updatedBook,
    deleteBook,
    searchBooks,
    getPopularBooks,
} = require('./book.controller');

const verifyAdminToken = require('../middleware/verifyAdminToken');

const router = express.Router();

// Create a new book
router.post("/create-book", verifyAdminToken, postABook);

// Get all books
router.get("/", getAllBooks);

// Get popular books (add this new route)
router.get('/popular', getPopularBooks);

// Search books
router.get('/search', searchBooks);

// Get single book
router.get("/:id", getSingleBook);

// Update book
router.put("/edit/:id", verifyAdminToken, updatedBook);

// Delete book
router.delete("/:id", verifyAdminToken, deleteBook);

module.exports = router;