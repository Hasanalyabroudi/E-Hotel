const express = require('express');
const router = express.Router();
const { Archive } = require('../models');

// Fetch all archives
router.get('/', async (req, res) => {
  try {
      const archives = await Archive.findAll();
      res.json(archives);
  } catch (error) {
      console.error('Error fetching archives:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Fetch a single archive data
router.get('/archive', async (req, res) => {
  try {
      // In a real app, replace this with authentication-based user identification
      const { ArchiveID } = req.query;

      if (!ArchiveID) {
          return res.status(400).send({ message: "ArchiveID is required to fetch data." });
      }

      const archive = await Archive.findOne({ where: { ArchiveID } });
      if (archive) {
          res.json(archive);
      } else {
          res.status(404).send({ message: "Archive not found." });
      }
  } catch (error) {
      console.error('Error fetching Archive data:', error);
      res.status(500).send('Internal Server Error');
  }
});


// Create ArchiveID 
router.post('/create-archive', async (req, res) => {
  try {
    const { ArchiveID, Type, RoomNumber, BookingID, RentalID, CustomerSIN } = req.body;
    try {
        const newArchive = await Archive.create({
            ArchiveID, Type, RoomNumber, BookingID, RentalID, CustomerSIN
        });
        res.status(201).json(newArchive);
    } catch (error) {
        console.error('Error creating archive:', error);
        res.status(500).send('Internal Server Error');
    }

  } catch (error) {
    console.error('Error creating archive:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update an existing archive by id
router.put('/:ArchiveID', async (req, res) => {
  const { ArchiveID } = req.params;
  const { Type, RoomNumber, BookingID, RentalID, CustomerSIN } = req.body;
  try {
    const archive = await Archive.update({ Type, RoomNumber, BookingID, RentalID, CustomerSIN }, {
      where: { ArchiveID }
    });
    if (archive[0] > 0) {
      res.json({ message: "Archive updated successfully." });
    } else {
      res.status(404).send({ message: "Archive not found." });
    }
  } catch (error) {
    console.error('Error updating archive:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a archive by id
router.delete('/:ArchiveID', async (req, res) => {
    try {
        const { ArchiveID } = req.params;
        await Archive.destroy({
            where: { ArchiveID }
        });
        res.send('Archive deleted successfully');
    } catch (error) {
        console.error('Error deleting archive:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Add more routes as needed...

module.exports = router;
