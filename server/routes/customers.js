const express = require('express');
const router = express.Router();
const { Customer } = require('../models'); // Assuming this path is correct based on your project structure
const bcrypt = require('bcryptjs');

// Fetch all customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Fetch a single customer's profile
router.get('/profile', async (req, res) => {
  try {
      // In a real app, replace this with authentication-based user identification
      const { SIN } = req.query;

      if (!SIN) {
          return res.status(400).send({ message: "SIN is required to fetch profile." });
      }

      const customer = await Customer.findOne({ where: { SIN } });
      if (customer) {
          res.json(customer);
      } else {
          res.status(404).send({ message: "Customer not found." });
      }
  } catch (error) {
      console.error('Error fetching customer profile:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Create a new customer or update an existing one with null password
router.post('/signup', async (req, res) => {
    const { SIN, Name, Address, RegistrationDate, Password } = req.body;

    try {
        // Try to find an existing customer with the given SIN
        const existingCustomer = await Customer.findOne({ where: { SIN } });

        if (existingCustomer) {
            // Check if the existing customer's password is null and a new password is provided
            if (existingCustomer.Password === null && Password) {
                const hashedPassword = await bcrypt.hash(Password, 12); // Hash new password
                // Update the existing customer's information with the new hashed password
                await Customer.update({
                    Name,
                    Address,
                    RegistrationDate,
                    Password: hashedPassword
                }, {
                    where: { SIN }
                });
                return res.json({ message: "Customer updated successfully with new password." });
            } else if (existingCustomer.Password === null && !Password) {
                // Update the customer without changing the password
                await Customer.update({
                    Name,
                    Address,
                    RegistrationDate,
                    // Keep the Password as null
                }, {
                    where: { SIN }
                });
                return res.json({ message: "Customer updated successfully without password." });
            } else {
                // If the existing customer has a password, prevent signup with the same SIN
                return res.status(400).send({ message: "A customer with this SIN already exists." });
            }
        } else {
            // If no existing customer is found, create a new one
            let newCustomerData = {
                SIN, 
                Name, 
                Address, 
                RegistrationDate
            };

            if (Password) { // If a password is provided, hash it and include in the new customer data
                const hashedPassword = await bcrypt.hash(Password, 12);
                newCustomerData.Password = hashedPassword;
            }

            const newCustomer = await Customer.create(newCustomerData);
            return res.status(201).json(newCustomer);
        }
    } catch (error) {
        console.error('Error in customer signup:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Ensure a customer exists or create/update them for booking/rental
router.post('/ensure-customer', async (req, res) => {
    const { SIN, Name, Address, RegistrationDate } = req.body;

    try {
        const existingCustomer = await Customer.findOne({ where: { SIN } });

        if (existingCustomer) {
            // If the customer exists but has no password, update their details (except for Password)
            if (existingCustomer.Password === null) {
                await Customer.update({
                    Name,
                    Address,
                    RegistrationDate
                }, {
                    where: { SIN }
                });
                return res.json({ message: "Customer details updated successfully.", SIN });
            } else {
                // If customer exists and has a password, just return their SIN
                return res.json({ message: "Customer exists with a password.", SIN });
            }
        } else {
            // If the customer doesn't exist, create a new customer record with null password
            await Customer.create({
                SIN,
                Name,
                Address,
                RegistrationDate,
                Password: null // Explicitly set password to null
            });
            return res.status(201).json({ message: "New customer created successfully.", SIN });
        }
    } catch (error) {
        console.error('Error ensuring customer:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Login a customer
router.post('/login', async (req, res) => {
    try {
        const { SIN, Password } = req.body;
        const customer = await Customer.findOne({ where: { SIN } });

        if (!customer) {
            return res.status(404).send({ message: "Customer not found." });
        }

        // Check if the customer's password is hashed (i.e., not null)
        if (customer.Password) {
            // Use bcrypt.compare to check if the provided password matches the hashed password
            const isMatch = await bcrypt.compare(Password, customer.Password);
            if (isMatch) {
                // If the passwords match, login is successful
                res.json({ message: "Login successful." });
            } else {
                // If the passwords do not match, return an invalid password error
                res.status(401).send({ message: "Invalid password." });
            }
        } else {
            // If the customer's password is null, it means they haven't set a password yet
            // Handle this case accordingly, e.g., prompt them to set a password
            res.status(401).send({ message: "No password set for this account. Please set a password." });
        }
    } catch (error) {
        console.error('Error logging in customer:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Update an existing customer by id (assuming SIN as unique identifier here)
router.put('/:SIN', async (req, res) => {
  const { SIN } = req.params;
  const { Name, Address } = req.body;
  try {
    const customer = await Customer.update({ Name, Address }, {
      where: { SIN }
    });
    if (customer[0] > 0) {
      res.json({ message: "Customer updated successfully." });
    } else {
      res.status(404).send({ message: "Customer not found." });
    }
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a customer by id
router.delete('/:SIN', async (req, res) => {
    try {
        const { SIN } = req.params;
        await Customer.destroy({
            where: { SIN }
        });
        res.send('Customer deleted successfully');
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
