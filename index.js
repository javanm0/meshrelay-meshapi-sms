import express from 'express';
import bodyParser from 'body-parser';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !fromPhoneNumber) {
  throw new Error('Missing Twilio environment variables');
}

const client = twilio(accountSid, authToken);

app.use(bodyParser.json());

app.post('/api/sms', async (req, res) => {
  try {
    const { to, body } = req.body;
    const message = await client.messages.create({
      body,
      to,
      from: fromPhoneNumber,
    });
    res.json({ sid: message.sid });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});