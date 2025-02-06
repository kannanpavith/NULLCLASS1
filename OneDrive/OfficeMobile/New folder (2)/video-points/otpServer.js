const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // For generating OTPs
const app = express();
app.use(express.json());

// In-memory OTP store (For demo purposes, you can use a database in a real scenario)
let otpStore = {};

// Function to generate a random OTP
function generateOTP() {
    return crypto.randomInt(100000, 999999).toString(); // Generates a 6-digit OTP
}

// Mock function to send OTP (you can replace this with actual email or SMS service)
async function sendOTP(email, phoneNumber, method, otp) {
    if (method === 'email') {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your_email@gmail.com',
                pass: 'your_email_password'
            }
        });

        const mailOptions = {
            from: 'your_email@gmail.com',
            to: email,
            subject: 'OTP for Login',
            text: `Your OTP is: ${otp}` // Send OTP in email
        };

        await transporter.sendMail(mailOptions);
    } else if (method === 'sms') {
        // Replace with actual SMS service like Twilio for sending OTP via SMS
        console.log(`Send SMS OTP to ${phoneNumber}: ${otp}`);
    }
}

app.post('/send_otp', async (req, res) => {
    const { location, method, email, phone_number } = req.body;

    const otp = generateOTP(); // Generate OTP

    // Store OTP in memory (For demonstration purposes)
    otpStore[phone_number || email] = otp;

    if (method === 'email') {
        await sendOTP(email, null, method, otp);
    } else if (method === 'sms') {
        await sendOTP(null, phone_number, method, otp);
    }

    res.send({ message: 'OTP sent' });
});

app.post('/verify_otp', (req, res) => {
    const { phone_number, email, otp } = req.body;

    const key = phone_number || email;
    const storedOtp = otpStore[key];

    if (storedOtp && storedOtp === otp) {
        res.send({ message: 'OTP verified successfully!' });
    } else {
        res.status(400).send({ message: 'Invalid OTP!' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
