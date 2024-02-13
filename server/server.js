// server.js

import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Use body-parser middleware to parse JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

let calculatedEfficiency = null;

app.post('/calculateEfficiency', (req, res) => {
    try {
        calculatedEfficiency = calculateActualEfficiency(req.body.location, req.body.panelType, req.body.tiltAngle);

        const suggestions = offerOptimizationSuggestions(calculatedEfficiency);

        res.json({ efficiency: calculatedEfficiency, suggestions });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getEfficiency', (req, res) => {
    if (calculatedEfficiency !== null) {
        res.json({ efficiency: calculatedEfficiency });
    } else {
        res.json({ message: 'Efficiency not calculated yet. Perform a POST request to /calculateEfficiency first.' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

function calculateActualEfficiency(location, panelType, tiltAngle) {
    let baseEfficiency = 20;

    if (panelType === 'monocrystalline') {
        baseEfficiency += 10; 
    } else if (panelType === 'polycrystalline') {
        baseEfficiency += 5;
    }
    if (tiltAngle < 0 || tiltAngle > 360) {
        throw new Error('Tilt angle must be within the range of 0 to 360 degrees.');
    }
    const tiltEfficiency = tiltAngle > 0 ? tiltAngle * 0.5 : 0;
    const locationEfficiency = location > 4 ? (location - 4) * 1.5 : 0;

    const totalEfficiency = baseEfficiency + tiltEfficiency + locationEfficiency;
    return Math.min(totalEfficiency, 100);
}


// Sample function to offer optimization suggestions
function offerOptimizationSuggestions(efficiency) {
    // Replace this with your actual suggestion logic
    return efficiency > 0.5 ? 'Optimal efficiency achieved!' : 'Consider optimizing for better efficiency.';
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
