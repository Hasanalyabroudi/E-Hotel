const express = require('express');
const router = express.Router();
const { Room } = require('../models');

// Fetch all Rooms
router.get('/', async (req, res) => {
  try {
      const rooms = await Room.findAll();
      res.json(rooms);
  } catch (error) {
      console.error('Error fetching rooms:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Fetch a single chain's data
router.get('/room', async (req, res) => {
  try {
      // In a real app, replace this with authentication-based user identification
      const { RoomNumber } = req.query;

      if (!RoomNumber) {
          return res.status(400).send({ message: "RoomNumber is required to fetch data." });
      }

      const room = await Room.findOne({ where: { RoomNumber } });
      if (room) {
          res.json(room);
      } else {
          res.status(404).send({ message: "Room not found." });
      }
  } catch (error) {
      console.error('Error fetching room data:', error);
      res.status(500).send('Internal Server Error');
  }
});


// Create room 
router.post('/create-room', async (req, res) => {
  try {
    const { RoomNumber, Price, Amenities, Capacity, RoomView, Extendable, Damages, HotelID } = req.body;
    try {
        const newRoom = await Room.create({
            RoomNumber, 
            Price, 
            Amenities, 
            Capacity, 
            RoomView, 
            Extendable, 
            Damages, 
            HotelID
        });
        res.status(201).json(newRoom);
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).send('Internal Server Error');
    }

  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update an existing room by id
router.put('/:RoomNumber', async (req, res) => {
  const { RoomNumber } = req.params;
  const { Price, Amenities, Capacity, RoomView, Extendable, Damages, HotelID } = req.body;
  try {
    const room = await Room.update({ Price, Amenities, Capacity, RoomView, Extendable, Damages, HotelID }, {
      where: { RoomNumber }
    });
    if (room[0] > 0) {
      res.json({ message: "Room updated successfully." });
    } else {
      res.status(404).send({ message: "Room not found." });
    }
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a chain by id
router.delete('/:RoomNumber', async (req, res) => {
    try {
        const { RoomNumber } = req.params;
        await Room.destroy({
            where: { RoomNumber }
        });
        res.send('Room deleted successfully');
    } catch (error) {
        console.error('Error deleting room:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Add more routes as needed...

module.exports = router;
