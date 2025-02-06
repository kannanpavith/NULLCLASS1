// Constants for daily download limits and points
// Constants for daily download limits and points
let dailyDownloadLimit = 1;
let downloadsToday = 0;
let points = 0;
let premiumUser = false;
let upgradePrompted = false;

// Watch video functionality
function watchVideo(videoId) {
    let pointsEarned = 0;

    // Assign points based on video ID
    switch (videoId) {
        case 1:
            pointsEarned = 5; // Points for Video 1
            break;
        case 2:
            pointsEarned = 10; // Points for Video 2
            break;
        default:
            alert("Invalid video ID. Please select a valid video.");
            return; // Exit the function if an invalid video ID is provided
    }

    // Increment the points and update the UI
    points += pointsEarned; 
    document.getElementById('points').textContent = points; 

    // Notify the user about the earned points
    alert(`Now watching Video ${videoId}. Points earned: ${pointsEarned}. Total points: ${points}`);
}

// Handle video download functionality
function handleDownload() {
    if (premiumUser) {
        downloadsToday += 1;
        document.getElementById('downloaded-videos').textContent = downloadsToday;
        alert("Video downloaded!");
    } else {
        if (downloadsToday < dailyDownloadLimit) {
            downloadsToday += 1;
            document.getElementById('downloaded-videos').textContent = downloadsToday;
            alert("Video downloaded!");
        } else if (!upgradePrompted) {
            alert("You have reached your daily download limit. Upgrade to Premium for unlimited downloads!");
            document.getElementById('upgrade-button').style.display = 'block';
            upgradePrompted = true;
        } else {
            alert("Redirecting you to the upgrade page...");
            setTimeout(() => {
                window.location.href = 'upgrade.html';
            }, 500);
        }
    }
}

// Razorpay payment integration
/*function initiatePayment() {
    const downloadButton = document.querySelector('.download-button');
    downloadButton.disabled = true;
    downloadButton.textContent = "Processing...";

    const options = {
        "key": "YOUR_RAZORPAY_KEY", 
        "amount": 9900, 
        "currency": "INR",
        "name": "Video Platform",
        "description": "Upgrade to Premium",
        "image": "https://tse4.mm.bing.net/th?id=OIP.PaYT-o6ksNMeunnnUQh8qQHaFC&pid=Api&P=0&h=180",
        "handler": function (response) {
            alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
            premiumUser = true;
            downloadsToday = 0; // Reset download count for the day
            document.getElementById('downloaded-videos').textContent = downloadsToday;
            downloadButton.disabled = false;
            downloadButton.textContent = "Download Video";
            alert("You are now a Premium User!");
        },
        "prefill": {
            "name": "Your Name",
            "email": "your_email@example.com",
            "contact": "9999999999"
        },
        "theme": {
            "color": "#F37254"
        }
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
    event.preventDefault();
}

// Redirect to upgrade page
function goToUpgrade() {
    window.location.href = 'upgrade.html';
}

// Apply theme based on time and location
async function applyTheme() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const userLocation = await getUserLocation();

    const southernStates = ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana'];

    if (southernStates.includes(userLocation)) {
        document.body.classList.add('white-theme');
        document.body.classList.remove('dark-theme');
        sendOTP(userLocation, 'email');
    } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('white-theme');
        sendOTP(userLocation, 'sms');
    }
}

async function getUserLocation() {
    const response = await fetch('https://ipinfo.io/json?token=your_ipinfo_token');
    const data = await response.json();
    return data.region;
}

async function sendOTP(location, method) {
    const userEmail = 'user@example.com';
    const userPhoneNumber = '9999999999';

    await fetch('/send_otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            location,
            email: method === 'email' ? userEmail : null,
            phone_number: method === 'sms' ? userPhoneNumber : null
        })
    });

    console.log(`OTP sent via ${method} for location: ${location}`);
}

window.onload = applyTheme; */
