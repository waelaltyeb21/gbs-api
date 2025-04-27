const FileHandler = require("fs");
const { isValidObjectId } = require("mongoose");
const BookModel = require("./BookModel");
const path = require("path");
const CategoryModel = require("../Categories/CategoryModel");
// Get all books
const GetBooks = async (req, res) => {
  try {
    // Fetch all books from the database
    const books = await BookModel.find().populate("category", "name"); // Populate category name
    const categories = await CategoryModel.find();

    return res.status(200).json({ books, categories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};
// Get Book by ID
const GetBookById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Book ID" });
    }
    // Fetch book by ID from the database
    const book = await BookModel.findById(id).populate("category", "name"); // Populate category name
    const categories = await CategoryModel.find();
    // Check if book exists
    if (!book) return res.status(404).json({ message: "Book not found" });
    // Return the book details
    return res.status(200).json({ book, categories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error });
  }
};
// Add New Book
const CreateBook = async (req, res) => {
  const { title, author, price, isAvailable, category } = req.body;
  const { file } = req;
  try {
    if (!file) return res.status(400).json("No file uploaded.");
    const imageFile = file.filename.split(" ").join("-");
    // Create a new book in the database
    const book = await BookModel.create({
      title,
      author,
      image: imageFile,
      price,
      isAvailable,
      category,
    });
    // Check if the book was created successfully
    book.save();
    if (book) {
      return res.status(201).json({ message: "Book created successfully" });
    }
    return res.status(400).json({ message: "Book not created" });
  } catch (error) {
    res.status(500).json({ message: "Error creating book", error });
  }
};
// Update Book
const UpdateBook = async (req, res) => {
  const { id } = req.params;
  const { file } = req;
  const { title, author, price, category, isAvailable, oldName } = req.body;
  try {
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Book ID" });
    }
    let imageFile = file ? file?.filename?.split(" ").join("-") : oldName;
    // Update book in the database
    const book = await BookModel.findByIdAndUpdate(
      id,
      { title, author, image: imageFile, price, isAvailable, category },
      { new: true }
    );
    // Delete The Old Image File
    if (file)
      FileHandler.unlinkSync(path.join(__dirname, `../../Uploads/${oldName}`));

    // Check if the book was updated successfully
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};
// Delete Book
const DeleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Book ID" });
    }
    // Delete book from the database
    const book = await BookModel.findByIdAndDelete(id);
    FileHandler.unlinkSync(path.join(__dirname, `../../Uploads/${book.image}`));
    // Check if the book was deleted successfully
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};

module.exports = {
  GetBooks,
  GetBookById,
  CreateBook,
  UpdateBook,
  DeleteBook,
};
