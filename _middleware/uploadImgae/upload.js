const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }

};
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploadImages');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, __basedir + "./uploadImages");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
//   },
// });

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;