const mongoose = require("mongoose");
const app = require("../index");

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
          console.log(`Server Is Running`);
        });
      });
    // console.log("DB Name: ", mongoose.connection.name); // Should print: Galees_BookShop
  } catch (error) {
    console.log("DB Connection Error: ", error);
  }
};

Connect_To_DB();
