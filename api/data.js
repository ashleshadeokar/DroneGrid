const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
app.use(cors());
app.use(express.json());

let dataPoints = [];

// Function to load data from CSV file
const loadData = () => {
    dataPoints = [];
    fs.createReadStream(path.join(__dirname, '..', 'data.csv'))  // Ensure the CSV file path is correctly specified relative to this file
        .pipe(csv())
        .on('data', (row) => {
            const { lat, lng, laser_lat, laser_lon, alt, yaw, pitch, roll } = row;
            dataPoints.push({
                lat: parseFloat(lat),
                lng: parseFloat(lng),
                laser_lat: parseFloat(laser_lat),
                laser_lon: parseFloat(laser_lon),
                alt: parseFloat(alt),
                yaw: parseFloat(yaw),
                pitch: parseFloat(pitch),
                roll: parseFloat(roll),
            });
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
        });
};

// Load data once when the server starts
loadData();

// API endpoint to fetch all data points
app.get('/api/data', (req, res) => {
    res.json(dataPoints);
});

// Vercel expects module.exports to be a function handling (req, res)
module.exports = (req, res) => {
    app(req, res);
};

