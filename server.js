const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());  // Enable Cross-Origin Requests
app.use(bodyParser.json());  // Parse incoming JSON requests

// PostgreSQL client
const client = new Client({
    host: 'dpg-cv3elbl2ng1s73fvca0g-a',
    port: 5432,
    user: 'agallobrian',
    password: 'TkAVNlmySam1CyEgi6II43fMo5A6a6D5',
    database: 'agallodb'
});

// Connect to the database
client.connect();

// Endpoint to fetch all bookings
app.get('/admin/bookings', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM bookings');
        const bookings = result.rows;
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Error fetching bookings' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
