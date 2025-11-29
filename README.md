# ✈️ SkyBook - Flight Booking System 
**SkyBook** is a full-stack web application that simulates a flight booking experience. It allows users to search for flights between major cities, view dynamic flight schedules, and simulate the booking and payment process using a mock gateway.

## 🌟 Features : -
* **Dynamic Flight Search:** Uses a smart algorithm to generate random flights with varying prices and times between selected cities.
* **Real-time Filtering:** Filters flights based on Departure and Destination cities.
* **Ticket Generation:** Users can review details and generate a flight ticket.
* **Mock Payment Gateway:** Simulates a payment flow with options for:
    * QR Code Scanning
    * Google Pay (UPI ID Validation)
* **Print Ticket:** Functionality to print or save the booked ticket as a PDF.
* **Responsive Design:** Works smoothly on desktop and tablet screens.

## 🛠️ Tech Stack :-
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
* **Backend:** Node.js, Express.js
* **Database:** Mock Data (In-memory generation logic)

## dX Folder Structure :
To run this project correctly, ensure your files are organized as follows (based on `server.js` configuration):

flight-booking-app/
├── public/              # Create this folder
│   ├── index.html       # Move HTML here
│   ├── style.css        # Move CSS here
│   ├── script.js        # Move JS here
│   ├── bg.jpg           # Background image
│   └── qr.png           # QR code image
├── server.js            # Main backend file
├── package.json
└── README.md
