const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000; // REQUIRED for Railway

// 1. Allow Netlify to talk to this server
app.use(cors()); 
app.use(express.json());

// 2. The Verification Logic
app.post('/api/verify-lobby', (req, res) => {
    const { uids, groupCode, bundleName } = req.body;

    console.log(`[REQUEST] Group: ${groupCode} | Bundle: ${bundleName}`);

    // LOGIC: Check how many UIDs were sent
    // We filter out empty strings to count real players
    const activePlayers = uids.filter(id => id && id.trim().length > 0);

    // THE 3-PLAYER RULE
    if (activePlayers.length > 3) {
        return res.json({ 
            success: false, 
            message: "LOBBY FULL! Kick 1 player. GoBot needs Slot 4." 
        });
    }

    if (!groupCode) {
        return res.json({ success: false, message: "Invalid Group Code." });
    }

    // SIMULATE PROTOCOL DELAY (Makes it look real)
    setTimeout(() => {
        res.json({
            success: true,
            botId: "10620447392",
            status: "CONNECTED",
            message: `GoBot 10620447392 connected to Lobby ${groupCode}. Injecting ${bundleName}...`
        });
    }, 1500); // 1.5 second delay
});

// 3. Start the Server
app.listen(port, () => {
    console.log(`GoBot Server is running on port ${port}`);
});