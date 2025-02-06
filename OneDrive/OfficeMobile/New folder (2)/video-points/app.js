let userLocation = '';

// Fetch the user's location based on IP address
async function getUserLocation() {
    const response = await fetch('https://ipinfo.io/json?token=your_ipinfo_token');
    const data = await response.json();
    return data.region; // This will return the region (state) of the user
}

// Trigger OTP based on the user's location
async function triggerOTP() {
    const email = document.getElementById('email').value;

    if (email === '') {
        alert('Please enter your email');
        return;
    }

    // Get the user's location
    userLocation = await getUserLocation();
    
    // Define southern states to trigger OTP via email
    const southernStates = ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana'];

    if (southernStates.includes(userLocation)) {
        // Send OTP via email
        sendOTP(userLocation, 'email', email);
    } else {
        // Send OTP via mobile number
        sendOTP(userLocation, 'sms');
    }

    // Show OTP input section after sending OTP
    document.getElementById('otp-section').style.display = 'block';
}

// Send OTP either via email or SMS
async function sendOTP(location, method, email = '') {
    const userPhoneNumber = '9999999999'; // Placeholder phone number

    // Set the body data for the OTP request based on the method (email or SMS)
    const otpData = {
        location: location,
        method: method,
        email: method === 'email' ? email : null,
        phone_number: method === 'sms' ? userPhoneNumber : null
    };

    // Send the OTP using fetch to your server's /send_otp endpoint
    await fetch('/send_otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(otpData)
    });

    // Optionally, you can show a message or log something to confirm OTP has been sent
    alert(`OTP sent via ${method} for location: ${location}`);
}

// Verify OTP entered by the user
function verifyOTP() {
    const enteredOTP = document.getElementById('otp').value;

    if (enteredOTP === '') {
        alert('Please enter the OTP');
        return;
    }

    // Assuming we check OTP with backend
    alert('OTP Verified Successfully!');
    // After successful verification, allow user access
    window.location.href = '/dashboard'; // Redirect to dashboard or home page
}

window.onload = () => {
    // Check user location when the page loads to apply the appropriate theme
    getUserLocation().then(location => {
        const southernStates = ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana'];

        // Set body class based on location
        if (southernStates.includes(location)) {
            document.body.classList.add('white-theme');
            document.body.classList.remove('dark-theme');
        } else {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('white-theme');
        }
    });
};
