document.getElementById('carBookingForm').addEventListener('submit', function(e) {
    // Page refresh aagamarukka
    e.preventDefault();

    // Ella value-yum edukka
    const bookingData = {
        id: Date.now(), // Unique ID for each booking
        fname: document.getElementById('fname').value,
        lname: document.getElementById('lname').value,
        email: document.getElementById('email').value,
        dob: document.getElementById('dob').value,
        contact: document.getElementById('contact').value,
        state: document.getElementById('state').value,
        district: document.getElementById('district').value,
        city: document.getElementById('city').value,
        startDate: document.getElementById('startDate').value,
        returnDate: document.getElementById('returnDate').value,
        carCategory: document.getElementById('carCategory').value,
        carModel: document.getElementById('carModel').value,
        members: document.getElementById('members').value
    };

    // LocalStorage-il irunthu pazhaya data-vai edukka (illaiyendraal empty array)
    let bookings = JSON.parse(localStorage.getItem('carBookings')) || [];

    // Pudhiya data-vai array-il saerka
    bookings.push(bookingData);

    // Thirumba LocalStorage-il save seiya
    localStorage.setItem('carBookings', JSON.stringify(bookings));

    alert('Booking Details Saved Successfully!');

    // Form-ai reset seiya
    this.reset();
});
