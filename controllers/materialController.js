const sharp = require('sharp');
const path = require('path');
const Material = require('../models/Material'); // Import the Material model

exports.uploadMaterial = async (req, res) => {
  console.log('File received:', req.file); // Logs uploaded file details
  console.log('Body received:', req.body); // Logs additional form-data fields

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded!' });
  }

  try {
    // Define paths
    const inputPath = req.file.path;
    const outputPath = path.join(__dirname, '../uploads', `watermarked-${req.file.filename}`);

    // Add watermark
    await sharp(inputPath)
      .composite([
        {
          input: Buffer.from(
            `<svg>
              <text x="10" y="50" font-size="30" fill="white" opacity="0.5">Watermark</text>
            </svg>`
          ),
          gravity: 'southeast',
        },
      ])
      .toFile(outputPath);

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

    res.status(200).json({
      message: 'File uploaded and watermarked successfully!',
      file: {
        original: req.file.path,
        watermarked: outputPath,
      },
      material,
    });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Failed to process the file.' });
  }
};