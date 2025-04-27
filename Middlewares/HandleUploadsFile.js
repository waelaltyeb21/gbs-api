const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.split(" ").join("-"));
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
