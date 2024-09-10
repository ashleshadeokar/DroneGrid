const path = require('path');
const fs = require('fs');

module.exports = (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allows all domains
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Specifies methods allowed when accessing the resource
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // What headers can be used in the actual request

    // Check for OPTIONS request (pre-flight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Construct the file path to where your data.json file is stored
    const filePath = path.join(__dirname, '..', 'data.json');

    // Read the JSON file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // Log and return an error message if the file cannot be read
            console.error('Error reading JSON file:', err);
            return res.status(500).json({ error: 'Failed to load data' });
        }

        // Parse the JSON data and send it as a response
        try {
            const jsonData = JSON.parse(data);
            res.status(200).json(jsonData);
            console.log(jsonData);
        } catch (parseError) {
            // Log and return an error message if the JSON cannot be parsed
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({ error: 'Error parsing data' });
        }
    });
};
