const CategoryRoutes = require("express").Router();
const {
  GetCategories,
  GetCategoryById,
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
} = require("./CategoryController");

CategoryRoutes.get("/", GetCategories); // Get all categories
CategoryRoutes.get("/category/:id", GetCategoryById); // Get Category by ID
CategoryRoutes.post("/create", CreateCategory); // Add New Category
CategoryRoutes.put("/:id", UpdateCategory); // Update Category
CategoryRoutes.delete("/:id", DeleteCategory); // Delete Category

module.exports = CategoryRoutes;
