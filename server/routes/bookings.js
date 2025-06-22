const express = require('express');
const router = express.Router();
const { Booking } = require('../models');

// Fetch all bookings
router.get('/', async (req, res) => {
  try {
      const bookings = await Booking.findAll();
      res.json(bookings);
  } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Fetch a single bookings data
router.get('/booking', async (req, res) => {
  try {
      // In a real app, replace this with authentication-based user identification
      const { BookingID } = req.query;

      if (!BookingID) {
          return res.status(400).send({ message: "BookingID is required to fetch data." });
      }

      const booking = await Booking.findOne({ where: { BookingID } });
      if (booking) {
          res.json(booking);
      } else {
          res.status(404).send({ message: "Booking not found." });
      }
  } catch (error) {
      console.error('Error fetching booking data:', error);
      res.status(500).send('Internal Server Error');
  }
});


// Create booking 
router.post('/create-booking', async (req, res) => {
  try {
    const { BookingID, RegisterDate, StartDate, EndDate, CustomerSIN, RoomNumber, EmployeeSIN } = req.body;
    try {
        const newBooking = await Booking.create({
            BookingID, 
            RegisterDate, 
            StartDate, 
            EndDate, 
            CustomerSIN, 
            RoomNumber, 
            EmployeeSIN
        });
        res.status(201).json(newBooking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).send('Internal Server Error');
    }

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update an existing booking by id
router.put('/:BookingID', async (req, res) => {
  const { BookingID } = req.params;
  const { RegisterDate, StartDate, EndDate, CustomerSIN, RoomNumber, EmployeeSIN } = req.body;
  try {
    const booking = await Booking.update({ RegisterDate, StartDate, EndDate, CustomerSIN, RoomNumber, EmployeeSIN }, {
      where: { BookingID }
    });
    if (booking[0] > 0) {
      res.json({ message: "Booking updated successfully." });
    } else {
      res.status(404).send({ message: "Booking not found." });
    }
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a booking by id
router.delete('/:BookingID', async (req, res) => {
    try {
        const { BookingID } = req.params;
        await Booking.destroy({
            where: { BookingID }
        });
        res.send('Booking deleted successfully');
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Add more routes as needed...

module.exports = router;
