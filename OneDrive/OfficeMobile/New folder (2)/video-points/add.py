from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from twilio.rest import Client
import random
import requests

app = Flask(__name__)

# Twilio configuration
TWILIO_ACCOUNT_SID = 'your_twilio_account_sid'
TWILIO_AUTH_TOKEN = 'your_twilio_auth_token'
twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# Email configuration
SMTP_SERVER = 'smtp.example.com'
SMTP_PORT = 587
SMTP_USER = 'your_email@example.com'
SMTP_PASS = 'your_email_password'

# List of southern states
SOUTHERN_STATES = ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana']

def send_email_otp(email, otp):
    msg = MIMEText(f'Your OTP code is {otp}')
    msg['Subject'] = 'Your OTP Code'
    msg['From'] = SMTP_USER
    msg['To'] = email

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.sendmail(SMTP_USER, email, msg.as_string())

def send_sms_otp(phone_number, otp):
    message = twilio_client.messages.create(
        body=f'Your OTP code is {otp}',
        from_='+123456789',  # Your Twilio phone number
        to=phone_number
    )

def generate_otp():
    return str(random.randint(100000, 999999))

@app.route('/send_otp', methods=['POST'])
def send_otp():
    data = request.json
    email = data.get('email')
    phone_number = data.get('phone_number')
    location = get_user_location()

    otp = generate_otp()

    if location in SOUTHERN_STATES:
        send_email_otp(email, otp)
    else:
        send_sms_otp(phone_number, otp)

    return jsonify({'message': 'OTP sent successfully', 'location': location})

def get_user_location():
    response = requests.get('https://ipinfo.io/json?token=your_ipinfo_token')
    data = response.json()
    return data['region']

if __name__ == '__main__':
    app.run(debug=True)