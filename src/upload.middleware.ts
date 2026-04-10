import multer from 'multer';
import path from 'path';
import fs from 'fs';


const uploadPath = path.join(__dirname, '../uploads');


if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and PDF files are allowed!"));
  }
};


const limits = { fileSize: 5 * 1024 * 1024 };


export const uploadSingle = multer({ storage, fileFilter, limits }).single('file');
export const uploadMultiple = multer({ storage, fileFilter, limits }).array('files', 5);
export const uploadProductImages = multer({
  storage,
  fileFilter,
  limits,
}).array("images", 5);