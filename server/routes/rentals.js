const express = require('express');
const router = express.Router();
const { Rental } = require('../models');

// Fetch all rentals
router.get('/', async (req, res) => {
  try {
      const rentals = await Rental.findAll();
      res.json(rentals);
  } catch (error) {
      console.error('Error fetching rentals:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Fetch a single rental data
router.get('/rental', async (req, res) => {
  try {
      // In a real app, replace this with authentication-based user identification
      const { RentalID } = req.query;

      if (!RentalID) {
          return res.status(400).send({ message: "RentalID is required to fetch data." });
      }

      const rental = await Rental.findOne({ where: { RentalID } });
      if (rental) {
          res.json(rental);
      } else {
          res.status(404).send({ message: "Rental not found." });
      }
  } catch (error) {
      console.error('Error fetching rental data:', error);
      res.status(500).send('Internal Server Error');
  }
});


// Create Rental 
router.post('/create-rental', async (req, res) => {
  try {
    const { RentalID, BookingID, CheckInDate, CheckOutDate, CustomerSIN, EmployeeSIN, RoomNumber } = req.body;
    try {
        const newRental = await Rental.create({
            RentalID, BookingID, CheckInDate, CheckOutDate, CustomerSIN, EmployeeSIN, RoomNumber
        });
        res.status(201).json(newRental);
    } catch (error) {
        console.error('Error creating rental:', error);
        res.status(500).send('Internal Server Error');
    }

  } catch (error) {
    console.error('Error creating rental:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update an existing rental by id
router.put('/:RentalID', async (req, res) => {
  const { RentalID } = req.params;
  const { BookingID, CheckInDate, CheckOutDate, CustomerSIN, EmployeeSIN, RoomNumber } = req.body;
  try {
    const rental = await Rental.update({ BookingID, CheckInDate, CheckOutDate, CustomerSIN, EmployeeSIN, RoomNumber }, {
      where: { RentalID }
    });
    if (rental[0] > 0) {
      res.json({ message: "Rental updated successfully." });
    } else {
      res.status(404).send({ message: "Rental not found." });
    }
  } catch (error) {
    console.error('Error updating rental:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a rental by id
router.delete('/:RentalID', async (req, res) => {
    try {
        const { RentalID } = req.params;
        await Rental.destroy({
            where: { RentalID }
        });
        res.send('Rental deleted successfully');
    } catch (error) {
        console.error('Error deleting rental:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Add more routes as needed...

module.exports = router;
