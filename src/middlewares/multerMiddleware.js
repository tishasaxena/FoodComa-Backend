const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists (required for Render's ephemeral filesystem)
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

 const storageConfiguration = multer.diskStorage({ 
    destination : (req, file, next) => {
        next(null, 'uploads/');
    },
    filename: (req, file, next) => {
        console.log(file);
        next(null,  `${Date.now()}${path.extname(file.originalname)}` )
    }
 });

 const uploader = multer({storage: storageConfiguration});

 module.exports = uploader;
