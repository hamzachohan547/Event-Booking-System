// ==============================
// Check if user is logged in
// ==============================
function isLoggedIn() {
    return !!localStorage.getItem("token");
}

// ==============================
// Login Function
// ==============================
async function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "dashboard.html";
    } else {
        alert(data.message || "Login failed");
    }
}

// ==============================
// Register Function
// ==============================
async function registerUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
        alert(data.message || "Registered successfully");
        window.location.href = "login.html";
    } else {
        alert(data.message || "Registration failed");
    }
}

// ==============================
// Book Event Function
// ==============================
async function bookEvent() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    const eventType = document.getElementById("eventType").value;
    const date = document.getElementById("date").value;
     const name = document.getElementById("name").value;
      const number = document.getElementById("number").value;

    if (!eventType || !date) {
        alert("Please select event and date");
        return;
    }
    if (!name || !number) {
        alert("Please select name and number");
        return;
    }

    const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, eventType, date,name,number })
    });

    const data = await res.json();

    console.log("BOOK EVENT RESPONSE:", data); // 🔍 debug

    if (!res.ok) {
        alert(data.message || "Booking failed");
        return;
    }

    // ✅ CORRECT LINE
    localStorage.setItem("bookedEventId", data.eventId);

    alert("Event booked successfully!");
    window.location.href = "payment.html";
}


// ==============================
// PAYMENT PAGE LOGIC (AUTO-FILL EVENT ID)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    const eventInput = document.getElementById("eventId");
    const payBtn = document.getElementById("payBtn");

    // Agar payment page nahi hai to skip
    if (!eventInput || !payBtn) return;

    const bookedEventId = localStorage.getItem("bookedEventId");

    if (!bookedEventId) {
        alert("No booked event found");
        window.location.href = "book_event.html";
        return;
    }

    // ✅ Event ID auto-fill
    eventInput.value = bookedEventId;

    payBtn.addEventListener("click", makePayment);
});

// ==============================
// Make Payment Function
// ==============================
async function makePayment() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    const eventId = document.getElementById("eventId").value;
    const method = document.getElementById("method").value;
    const amount = document.getElementById("amount").value;

    if (!eventId || !method || !amount) {
        alert("Please fill all fields");
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/api/payments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: user._id,
                eventId,
                method,
                amount
            })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Payment failed");
            return;
        }

        alert("Payment successful!");
        localStorage.removeItem("bookedEventId");
        window.location.href = "dashboard.html";

    } catch (err) {
        console.error(err);
        alert("Server error. Check backend console.");
    }
}
