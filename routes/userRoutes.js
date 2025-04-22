const express = require('express');
const multer = require('multer');
const Material = require('../models/Material'); // Import the Material model
const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate unique filenames
  },
});
const upload = multer({ storage });

// Route: Upload a file
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.id || isNaN(req.body.id)) {
      return res.status(400).json({ message: 'Invalid or missing id' });
    }
    if (!req.body.title) {
      return res.status(400).json({ message: 'Missing title' });
    }
    if (!req.body.department) {
      return res.status(400).json({ message: 'Missing department' });
    }
    if (!req.body.year || isNaN(req.body.year)) {
      return res.status(400).json({ message: 'Invalid or missing year' });
    }

    // Save file metadata to the database
    const material = await Material.create({
      id: req.body.id,
      title: req.body.title || req.file.originalname,
      description: req.body.description || '',
      file_type: req.file.mimetype,
      price: req.body.price || null,
      approval_status: req.body.approval_status || 'pending',
      department: req.body.department,
      year: req.body.year,
      paid: false, // Default to unpaid
    });

    res.status(200).json({ message: 'File uploaded successfully', file: req.file, material });
  } catch (err) {
    console.error('Error saving to database:', err);
    res.status(500).json({ message: 'Error saving file metadata to the database', error: err.message });
  }
});

// Route: Fetch all materials
router.get('/materials', async (req, res) => {
  try {
    const materials = await Material.findAll();
    res.status(200).json(materials);
  } catch (err) {
    console.error('Error fetching materials:', err);
    res.status(500).json({ message: 'Error fetching materials' });
  }
});

// Route: Fetch a material by ID
router.get('/materials/:material_id', async (req, res) => {
  try {
    const materialId = parseInt(req.params.material_id, 10);
    const material = await Material.findByPk(materialId);

    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }

    // Check if the material is paid
    if (!material.paid) {
      return res.status(403).json({ message: 'Access denied. Material is not paid for.' });
    }

    res.status(200).json(material);
  } catch (err) {
    console.error('Error fetching material:', err);
    res.status(500).json({ message: 'Error fetching material' });
  }
});

// Route: Bookmark a material (mark as paid)
router.post('/materials/:material_id/bookmark', async (req, res) => {
  try {
    const materialId = parseInt(req.params.material_id, 10);
    console.log(`Received request to bookmark material with ID: ${materialId}`);

    const material = await Material.findByPk(materialId);
    if (!material) {
      console.log(`Material with ID ${materialId} not found.`);
      return res.status(404).json({ message: 'Material not found' });
    }

    // Mark the material as paid
    await material.update({ paid: true });
    console.log(`Material with ID ${materialId} marked as paid.`);

    res.status(200).json({ message: 'Material bookmarked successfully', material });
  } catch (err) {
    console.error('Error bookmarking material:', err);
    res.status(500).json({ message: 'Error bookmarking material', error: err.message });
  }
});

module.exports = router;