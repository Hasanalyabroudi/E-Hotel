const express = require('express');
const router = express.Router();
const { Hotel } = require('../models');

// Fetch all Hotels
router.get('/', async (req, res) => {
  try {
      const hotels = await Hotel.findAll();
      res.json(hotels);
  } catch (error) {
      console.error('Error fetching hotels:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Fetch a single chain's data
router.get('/hotel', async (req, res) => {
  try {
      // In a real app, replace this with authentication-based user identification
      const { HotelID } = req.query;

      if (!HotelID) {
          return res.status(400).send({ message: "HotelID is required to fetch data." });
      }

      const hotel = await Hotel.findOne({ where: { HotelID } });
      if (hotel) {
          res.json(hotel);
      } else {
          res.status(404).send({ message: "Hotel not found." });
      }
  } catch (error) {
      console.error('Error fetching hotel data:', error);
      res.status(500).send('Internal Server Error');
  }
});


// Create Hotel 
router.post('/create-hotel', async (req, res) => {
  try {
    const { HotelID, Name, Address, PhoneNumber, Email, ChainID, Rating } = req.body;
    try {
        const newHotel = await Hotel.create({
            ChainID,
            Name,
            Address,
            PhoneNumber,
            Email,
            ChainID,
            Rating
        });
        res.status(201).json(newHotel);
    } catch (error) {
        console.error('Error creating hotel:', error);
        res.status(500).send('Internal Server Error');
    }

  } catch (error) {
    console.error('Error creating hotel:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update an existing hotel by id
router.put('/:HotelID', async (req, res) => {
  const { HotelID } = req.params;
  const { Name, Address, PhoneNumber, Email, ChainID, Rating } = req.body;
  try {
    const hotel = await Hotel.update({ Name, Address, PhoneNumber, Email, ChainID, Rating }, {
      where: { HotelID }
    });
    if (hotel[0] > 0) {
      res.json({ message: "Hotel updated successfully." });
    } else {
      res.status(404).send({ message: "Hotel not found." });
    }
  } catch (error) {
    console.error('Error updating hotel:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a chain by id
router.delete('/:HotelID', async (req, res) => {
    try {
        const { HotelID } = req.params;
        await Hotel.destroy({
            where: { HotelID }
        });
        res.send('Hotel deleted successfully');
    } catch (error) {
        console.error('Error deleting Hotel:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Add more routes as needed...

module.exports = router;
