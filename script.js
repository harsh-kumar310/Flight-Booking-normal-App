const searchBtn = document.getElementById('search-btn');
const resultsArea = document.getElementById('results-area');
const loader = document.getElementById('loader');

let selectedFlight = null; // store selected flight

// ---------------------- MAIN SEARCH FUNCTION -----------------------
searchBtn.addEventListener('click', async () => {
    const fromCity = document.getElementById('from-city').value;
    const toCity = document.getElementById('to-city').value;

    if (!fromCity || !toCity) {
        alert("Please select both From and To cities!");
        return;
    }

    resultsArea.innerHTML = '';
    loader.style.display = 'block';

    try {
        const response = await fetch(`/api/search?from=${fromCity}&to=${toCity}`);
        const flights = await response.json();

        loader.style.display = 'none';

        if (flights.length === 0) {
            resultsArea.innerHTML = '<p class="error">No flights found for this route.</p>';
            return;
        }

        flights.forEach(flight => {
            const card = document.createElement('div');
            card.classList.add('flight-card');
            
            card.innerHTML = `
                <div class="flight-info">
                    <h3>${flight.airline} <small>(${flight.id})</small></h3>
                    <p>⏰ ${flight.time} | 🛫 ${flight.from} ➝ 🛬 ${flight.to}</p>
                </div>
                <div class="price">₹${flight.price}</div>
            `;

            // Add Generate Ticket Button
            card.appendChild(addGenerateButton(flight));

            resultsArea.appendChild(card);
        });

    } catch (error) {
        console.error("Error fetching data:", error);
        loader.style.display = 'none';
        resultsArea.innerHTML = '<p class="error">Server Error! Please try again later.</p>';
    }
});

// ---------------------- GENERATE TICKET BUTTON -----------------------
function addGenerateButton(flight) {
    const btn = document.createElement("button");
    btn.textContent = "Generate Ticket";
    btn.className = "ok";
    btn.style.marginTop = "10px";

    btn.addEventListener("click", () => {
        selectedFlight = flight;

        document.getElementById("ticket-summary").innerHTML =
            `<b>Flight:</b> ${flight.airline} (${flight.id})<br>
             <b>Route:</b> ${flight.from} → ${flight.to}<br>
             <b>Time:</b> ${flight.time}<br>
             <b>Price:</b> ₹${flight.price}`;

        document.getElementById("ticket-modal").style.display = "flex";
    });

    return btn;
}

// ---------------------- CANCEL BUTTON -----------------------
document.getElementById("cancel-ticket").onclick = () => {
    document.getElementById("ticket-modal").style.display = "none";
};

// ---------------------- OK, GENERATE BUTTON -----------------------
document.getElementById("ok-generate").onclick = () => {
    document.getElementById("ticket-modal").style.display = "none";
    document.getElementById("payment-box").style.display = "block";
};

// ---------------------- PAYMENT OPTIONS -----------------------
document.getElementById("pay-qr").onclick = () => {
    document.getElementById("qr-section").classList.remove("hidden");
    document.getElementById("google-section").classList.add("hidden");
};

document.getElementById("pay-google").onclick = () => {
    document.getElementById("google-section").classList.remove("hidden");
    document.getElementById("qr-section").classList.add("hidden");
};

// ---------------------- GOOGLE ID CONFIRM PAYMENT -----------------------
document.getElementById("google-confirm").onclick = () => {
    const id = document.getElementById("google-id").value;

    if (!id) {
        alert("Please enter Google Pay ID!");
        return;
    }

    document.getElementById("ticket-success").classList.remove("hidden");
};

// ---------------------- QR PAYMENT CONFIRM -----------------------
document.getElementById("final-generate").onclick = () => {
    document.getElementById("ticket-success").classList.remove("hidden");
};

// ---------------------- PRINT TICKET -----------------------
document.getElementById("print-ticket").onclick = () => {
    window.print();
};
