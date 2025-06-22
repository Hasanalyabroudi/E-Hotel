const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customers'); // Adjust the path as necessary
const employeeRoutes = require('./routes/employees'); // Adjust the path as necessary
const hotelChainRoutes = require('./routes/hotelChains'); // Adjust the path as necessary
const hotelRoutes = require('./routes/hotels'); // Adjust the path as necessary
const roomRoutes = require('./routes/rooms'); // Adjust the path as necessary
const rentalRoutes = require('./routes/rentals'); // Adjust the path as necessary
const bookingRoutes = require('./routes/bookings'); // Adjust the path as necessary
const archiveRoutes = require('./routes/archives'); // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors()); // Enable All CORS Requests
app.use(express.json()); // Parse JSON bodies

// Root route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Use routes from the routes/customer.js file
app.use('/api/customers', customerRoutes);

// Use routes from the routes/employee.js file
app.use('/api/employees', employeeRoutes);

// Use routes from the routes/hotelChains.js file
app.use('/api/hotel-chains', hotelChainRoutes);

// Use routes from the routes/hotels.js file
app.use('/api/hotels', hotelRoutes);

// Use routes from the routes/rooms.js file
app.use('/api/rooms', roomRoutes);

// Use routes from the routes/bookings.js file
app.use('/api/bookings', bookingRoutes);

// Use routes from the routes/rentals.js file
app.use('/api/rentals', rentalRoutes);

// Use routes from the routes/archive.js file
app.use('/api/archives', archiveRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
