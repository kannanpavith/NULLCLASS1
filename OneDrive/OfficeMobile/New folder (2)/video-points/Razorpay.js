function makePayment(event) {
    event.preventDefault(); // Prevent the form from submitting

    var options = {
        "key": "YOUR_RAZORPAY_KEY", // Replace with your Razorpay API key
        "amount": 50000, // Amount in paise (i.e., 50000 paise = ₹500)
        "currency": "INR",
        "name": "Video Platform",
        "description": "Premium Subscription",
        "image": "https://www.example.com/logo.png",
        "handler": function (response) {
            alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        },
        "prefill": {
            "name": document.getElementById('name').value,
            "email": document.getElementById('email').value,
        },
        "notes": {
            "address": "Hello World"
        },
        "theme": {
            "color": "#1a73e8"
        }
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
}
