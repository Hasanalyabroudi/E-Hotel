const express = require('express');
const router = express.Router();
const { HotelChain } = require('../models');

// Fetch all HotelChains
router.get('/', async (req, res) => {
  try {
      const hotelChains = await HotelChain.findAll();
      res.json(hotelChains);
  } catch (error) {
      console.error('Error fetching chains:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Fetch a single chain's data
router.get('/chain', async (req, res) => {
  try {
      // In a real app, replace this with authentication-based user identification
      const { ChainID } = req.query;

      if (!ChainID) {
          return res.status(400).send({ message: "ChainID is required to fetch data." });
      }

      const hotelChain = await HotelChain.findOne({ where: { ChainID } });
      if (hotelChain) {
          res.json(hotelChain);
      } else {
          res.status(404).send({ message: "Chain not found." });
      }
  } catch (error) {
      console.error('Error fetching chain data:', error);
      res.status(500).send('Internal Server Error');
  }
});


// Create Hotel Chain
router.post('/create-chain', async (req, res) => {
  try {
    const { ChainID, Name, Address, PhoneNumber, Email } = req.body;
    try {
        const newChain = await HotelChain.create({
            ChainID,
            Name,
            Address,
            PhoneNumber,
            Email,
        });
        res.status(201).json(newChain);
    } catch (error) {
        console.error('Error creating chain:', error);
        res.status(500).send('Internal Server Error');
    }

  } catch (error) {
    console.error('Error creating chain:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update an existing chain by id
router.put('/:ChainID', async (req, res) => {
  const { ChainID } = req.params;
  const { Name, Address, PhoneNumber, Email } = req.body;
  try {
    const hotelChain = await HotelChain.update({ Name, Address, PhoneNumber, Email }, {
      where: { ChainID }
    });
    if (hotelChain[0] > 0) {
      res.json({ message: "Hotel Chain updated successfully." });
    } else {
      res.status(404).send({ message: "Hotel Chain not found." });
    }
  } catch (error) {
    console.error('Error updating hotel chain:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a chain by id
router.delete('/:ChainID', async (req, res) => {
    try {
        const { ChainID } = req.params;
        await HotelChain.destroy({
            where: { ChainID }
        });
        res.send('Hotel Chain deleted successfully');
    } catch (error) {
        console.error('Error deleting Hotel Chain:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Add more routes as needed...

module.exports = router;
