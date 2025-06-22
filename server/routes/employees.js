const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { Employee } = require('../models');

// Fetch all employees
router.get('/', async (req, res) => {
  try {
      const employees = await Employee.findAll();
      res.json(employees);
  } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Fetch a single employee's profile
router.get('/profile', async (req, res) => {
  try {
      // In a real app, replace this with authentication-based user identification
      const { SIN } = req.query;

      if (!SIN) {
          return res.status(400).send({ message: "SIN is required to fetch profile." });
      }

      const employee = await Employee.findOne({ where: { SIN } });
      if (employee) {
          res.json(employee);
      } else {
          res.status(404).send({ message: "Employee not found." });
      }
  } catch (error) {
      console.error('Error fetching employee profile:', error);
      res.status(500).send('Internal Server Error');
  }
});


// Employee signup
router.post('/signup', async (req, res) => {
  try {
    const { SIN, Name, Address, Role, HotelID, Password } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 12);

    try {
        const newEmployee = await Employee.create({
          SIN,
          Name,
          Address,
          Role,
          HotelID,
          Password: hashedPassword
        });
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error('Error signing up employee:', error);
        res.status(500).send('Internal Server Error');
    }

  } catch (error) {
    console.error('Error signing up employee:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Login as employee
router.post('/login', async (req, res) => {
  try {
    const { SIN, Password } = req.body;
    const employee = await Employee.findOne({ where: { SIN } });

    if (!employee) {
      return res.status(404).send({ message: "Employee not found." });
    }

    // Use bcrypt.compare to compare the provided password with the hashed password
    const passwordIsValid = await bcrypt.compare(Password, employee.Password);

    if (passwordIsValid) {
      res.json({ message: "Login successful." });
    } else {
      res.status(401).send({ message: "Invalid password." });
    }
  } catch (error) {
    console.error('Error logging in employee:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update an existing customer by id (assuming SIN as unique identifier here)
router.put('/:SIN', async (req, res) => {
  const { SIN } = req.params;
  const { Name, Address } = req.body;
  try {
    const employee = await Employee.update({ Name, Address }, {
      where: { SIN }
    });
    if (employee[0] > 0) {
      res.json({ message: "Employee updated successfully." });
    } else {
      res.status(404).send({ message: "Employee not found." });
    }
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a customer by id
router.delete('/:SIN', async (req, res) => {
    try {
        const { SIN } = req.params;
        await Employee.destroy({
            where: { SIN }
        });
        res.send('Employee deleted successfully');
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Add more routes as needed...

module.exports = router;
