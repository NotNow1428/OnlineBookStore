const express = require('express');
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, updatedBook, deleteBook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();


//post a book
router.post("/create-book", verifyAdminToken, postABook)

//get a book
router.get("/", getAllBooks);

//get single book
 router.get("/:id", getSingleBook);

//update book
router.put("/edit/:id", verifyAdminToken, updatedBook);

//delete book
router.delete("/:id", verifyAdminToken, deleteBook);
module.exports = router;