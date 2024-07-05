const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'img')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const originalname = file.originalname.toLowerCase();
      const extension = path.extname(originalname);
      const filename = file.fieldname + '-' + uniqueSuffix + extension;
      cb(null, filename);
    }
})
  
const upload = multer({ storage: storage })

const uploadMiddleware = upload.single('file');

export default uploadMiddleware;