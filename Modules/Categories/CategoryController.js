const { isValidObjectId, default: mongoose } = require("mongoose");
const CategoryModel = require("./CategoryModel");

const GetCategories = async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await CategoryModel.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "category",
          as: "books",
        },
      },
    ]);

    // Check if categories were found
    if (!categories)
      return res.status(404).json({ message: "No categories found" });
    return res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};
const GetCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Category ID" });
    }
    // Fetch category by ID from the database
    // const category = await CategoryModel.findById(id); // Populate book titles
    const [category] = await CategoryModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "category",
          as: "books",
        },
      },
    ]);
    // Check if category exists
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    // Return the category details
    return res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
};
const CreateCategory = async (req, res) => {
  // const { categories } = req.body;
  const { name } = req.body;
  try {
    // Create a new category in the database
    const check = await CategoryModel.find({ name });
    if (check.length != 0)
      return res.status(400).json({ message: "Category creation failed" });

    // const category = await CategoryModel.insertMany(categories);
    const category = await CategoryModel.create({ name });
    // Check if the category was created successfully
    if (!category)
      return res.status(400).json({ message: "Category creation failed" });
    // Return the created category details
    return res
      .status(201)
      .json({ category: category, message: "New Category Has Been Created" });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};
const UpdateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    if (!isValidObjectId(id) || !name) {
      return res.status(400).json({ message: "Invalid Category ID" });
    }
    // Update category in the database
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    // Check if the category was updated successfully
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    // Return the updated category details
    return res
      .status(200)
      .json({ message: "تم تحديث بيانات القسم", category: category });
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};
const DeleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Category ID" });
    }
    // Delete category from the database
    const category = await CategoryModel.findByIdAndDelete(id);
    // Check if the category was deleted successfully
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    // Return success message
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};

module.exports = {
  GetCategories,
  GetCategoryById,
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
};
