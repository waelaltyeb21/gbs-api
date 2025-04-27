const BookRoutes = require("express").Router();
const upload = require("../../Middlewares/HandleUploadsFile");
const {
  GetBooks,
  GetBookById,
  CreateBook,
  UpdateBook,
  DeleteBook,
} = require("./BookController");

BookRoutes.get("/", GetBooks); // Get all books
BookRoutes.get("/:id", GetBookById); // Get Book by ID
BookRoutes.post("/create", upload.single("image"), CreateBook); // Add New Book
BookRoutes.put("/:id", upload.single("image"), UpdateBook); // Update Book
BookRoutes.delete("/:id", DeleteBook); // Delete Book

module.exports = BookRoutes;
