import multer from "multer";

const imgconfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    console.log("FILE: " + file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(null, Error("Only image is allowd"));
  }
};

export const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
}).single("image");
