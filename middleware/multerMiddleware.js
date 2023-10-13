const multer = require('multer');
//Multer is a popular Node.js middleware used for handling file uploads in web applications.
//It simplifies the process of receiving files from clients (typically through HTTP POST requests) and storing them on the server.
const path = require('path');

const storage = multer.diskStorage({// is used to configure the storage engine for handling file uploads. 
    destination: (req, file, cb) => {
        let dest;
        if (file.fieldname === 'cv') {
            dest = 'uploads/cv/'; // Destination for CV files
        } else if (file.fieldname === 'certificateImages') {
            dest = 'uploads/certificates/'; // Destination for certificate images
        } else {
            dest = 'uploads/other/'; // Destination for other files (if any)
        }
        cb(null, dest);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    },
});

const upload = multer({ storage });

module.exports = upload;//is an instance of the Multer middleware configured with the specified storage settings.
