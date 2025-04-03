const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));  // Serve static files like HTML, CSS

// Serve index.html when root URL is requested
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle the league ID input and fetch data (use your API for real data)
app.post('/getPlayerData', async (req, res) => {
    const leagueID = req.body.leagueID;
    
    try {
        // Simulating data fetching (you can replace this with actual API calls)
        const playerData = [
            { name: 'Player X', points: 100 },
            { name: 'Player Y', points: 110 }
        ];
        res.json(playerData);
    } catch (error) {
        res.status(500).send('Error fetching player data');
    }
});

// Route to handle chatbot queries
app.post('/askQuestion', (req, res) => {
    const question = req.body.question.toLowerCase();
    let answer = "I'm not sure how to answer that.";

    // Simple rule-based responses
    if (question.includes("player x") && question.includes("above player y")) {
        answer = "Player X needs 15 more points to be above Player Y.";
    }
    else if (question.includes("player y") && question.includes("above player x")) {
        answer = "Player Y needs 10 more points to be above Player X.";
    }
    // Add more patterns for different questions you expect

    res.json({ answer });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
