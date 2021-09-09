const express = require('express');
const router = express.Router();
const multer  = require('multer');
const fileUpload = multer({ dest: 'uploads/' });

const FileController = require('./controllers/file.controller');

const fileController = new FileController();

// to add file/files object to the request object
router.use(fileUpload.single('file'));

router.post('/fileupload', fileController.uploadFile.bind(fileController));

module.exports = router;
