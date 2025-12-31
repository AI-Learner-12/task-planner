import twilio from 'twilio';

// Initialize Twilio Client
// These env vars must be set in Vercel
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { taskTitle } = req.body;

    if (!taskTitle) {
        return res.status(400).json({ message: 'Missing task title' });
    }

    try {
        const message = await client.messages.create({
            body: `New Task Created: "${taskTitle}"`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: '+13177985515' // Hardcoded verified number as requested
        });

        console.log('SMS sent:', message.sid);
        return res.status(200).json({ success: true, sid: message.sid });
    } catch (error) {
        console.error('Error sending SMS:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}
