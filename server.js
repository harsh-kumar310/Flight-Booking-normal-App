const express = require('express');
const path = require('path'); // Folder structure sahi karne ke liye zaroori hai
const app = express();
const port = 3000;

// --- 1. STATIC FOLDER SETUP (IMPORTANT) ---
// Ye line batati hai ki HTML/CSS files 'public' folder mein hain
app.use(express.static(path.join(__dirname, 'public')));

// --- 2. DATA CONFIGURATION ---
const airlines = [
    { name: 'IndiGo', code: '6E' },
    { name: 'Air India', code: 'AI' },
    { name: 'Vistara', code: 'UK' },
    { name: 'SpiceJet', code: 'SG' },
    { name: 'Akasa Air', code: 'QP' }
];

// List of Cities (Alphabetical Order)
const cities = [
    'IXA', 'AMD', 'ATQ', 'IXB', 'BLR', 'BBI', 'IXC', 'MAA', 'COK', 'DEL', 
    'GOI', 'GAU', 'HYD', 'IDR', 'JAI', 'CCU', 'LKO', 'BOM', 'NAG', 'PAT', 
    'PNQ', 'IXR', 'SXR', 'STV', 'TRV', 'VNS', 'VTZ'
];

// --- 3. AUTOMATIC FLIGHT GENERATOR ---
// Ye function server start hone par fake database banata hai
function generateFlights() {
    let flights = [];
    
    cities.forEach(fromCity => {
        cities.forEach(toCity => {
            if (fromCity !== toCity) {
                // Har route par 1 se 3 flights generate karo
                const numFlights = Math.floor(Math.random() * 3) + 1;

                for (let i = 0; i < numFlights; i++) {
                    const airline = airlines[Math.floor(Math.random() * airlines.length)];
                    
                    // Random Price between ₹3000 and ₹12000
                    const price = Math.floor(Math.random() * (12000 - 3000 + 1)) + 3000;
                    
                    // Random Time Logic
                    const hour = Math.floor(Math.random() * 12) + 1;
                    const minute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
                    const ampm = Math.random() > 0.5 ? 'AM' : 'PM';

                    flights.push({
                        id: `${airline.code}-${Math.floor(Math.random() * 900) + 100}`,
                        airline: airline.name,
                        from: fromCity,
                        to: toCity,
                        price: price,
                        time: `${hour}:${minute === 0 ? '00' : minute} ${ampm}`
                    });
                }
            }
        });
    });
    return flights;
}

// Database creation
const flightsDatabase = generateFlights();
console.log(`✅ Database Generated: Total ${flightsDatabase.length} flights ready!`);


// --- 4. API ROUTE (Search Logic) ---
app.get('/api/search', (req, res) => {
    // Frontend se data receive karna
    const fromCity = req.query.from; 
    const toCity = req.query.to;
    const travelDate = req.query.date; // Date bhi receive ho rahi hai

    console.log(`🔎 User Searching: ${fromCity} ➝ ${toCity} on Date: ${travelDate}`);

    // Database mein flights dhundna
    const filteredFlights = flightsDatabase.filter(flight => 
        flight.from === fromCity && flight.to === toCity
    );

    // Thoda delay taaki user ko loading animation dikhe (Real feel ke liye)
    setTimeout(() => {
        res.json(filteredFlights);
    }, 500); 
});

// --- 5. START SERVER ---
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});