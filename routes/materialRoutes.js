const express = require('express');
const multer = require('multer');
const materialController = require('../controllers/materialController'); // Update path as needed

const router = express.Router();

// Multer configuration to expect "File"
const upload = multer({ dest: 'uploads/' }); // Temporary file storage

// Route definition
router.post('/upload', upload.single('File'), materialController.uploadMaterial);

module.exports = router;
