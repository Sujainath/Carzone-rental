import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const db = getFirestore();

function showBookingMessage(message) {
  const msgDiv = document.getElementById("BookingMessage");
  msgDiv.style.display = "block";
  msgDiv.innerHTML = message;
  msgDiv.style.opacity = 1;

  setTimeout(() => {
    msgDiv.style.opacity = 0;
  }, 4000);
}

document.getElementById("bookingSubmit").addEventListener("click", async (e) => {
  e.preventDefault();

  // Collect form values
  const bookingData = {
    firstName: document.getElementById("fname").value,
    lastName: document.getElementById("lname").value,
    email: document.getElementById("email").value,
    dob: document.getElementById("dob").value,
    contact: document.getElementById("contact").value,
    state: document.getElementById("state").value,
    district: document.getElementById("district").value,
    city: document.getElementById("city").value,
    startDate: document.getElementById("startDate").value,
    returnDate: document.getElementById("returnDate").value,
    carCategory: document.getElementById("carCategory").value,
    carModel: document.getElementById("carModel").value,
    members: document.getElementById("members").value,
    bookedTime: new Date().toISOString(),
  };

  try {
    await addDoc(collection(db, "Bookings"), bookingData);

    // Show success message
    showBookingMessage("Booking Submitted Successfully!");

    // Reset the form
    document.querySelector(".form-grid").reset;
    document.querySelectorAll(".form-grid input, .form-grid select").forEach(inp => inp.value = "");

  } catch (error) {
    showBookingMessage("Booking failed. Please try again.");
    console.log("Error:", error);
  }
});
