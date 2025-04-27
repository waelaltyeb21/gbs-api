// Initialize Express App
const express = require("express");
const app = express();

// Load environment variables from .env file
const dotenv = require("dotenv");
dotenv.config();
// require("./Config/DB");

// new Intl.DateTimeFormat("en-US", {
//   timeZone: "Africa/Khartoum",
//   dateStyle: "full",
//   timeStyle: "short",
// }).format(new Date());

// console.log(date);

// Connect to DB

// Middleware
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "../Uploads")));
// Parse incoming requests with JSON payloads
app.use(express.json());

// Cors middleware to enable Cross-Origin Resource Sharing
const cors = require("cors");
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "https://galees.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Import Routes
const CategoryRoutes = require("./Modules/Categories/CategoryRoutes");
const BookRoutes = require("./Modules/Books/BookRoutes");
const LoginRoutes = require("./Modules/Register/LoginRoutes");
const { default: mongoose } = require("mongoose");

// Use Routes
app.use("/api/categories", CategoryRoutes);
app.use("/api/books", BookRoutes);
app.use("/api/login", LoginRoutes);

const Connect_To_DB = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL, {
        dbName: "Galees_BookShop",
      })
      .then(() => {
        console.log("DB Connected");
        // Server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
          console.log(`Server Is Running`, PORT);
        });
      });
    // console.log("DB Name: ", mongoose.connection.name); // Should print: Galees_BookShop
  } catch (error) {
    console.log("DB Connection Error: ", error);
  }
};

Connect_To_DB();
