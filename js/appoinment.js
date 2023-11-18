// Data jadwal dokter
const doctorSchedules = {
    dreng: {
        workingDays: [1, 3, 5], // Senin, Rabu, Jumat
        workingHours: { start: 9, end: 14 } // 9 AM - 2 PM
    },
    drvito: {
        workingDays: [2, 4, 6], // Selasa, Kamis, Sabtu
        workingHours: { start: 15, end: 20 } // 3 PM - 8 PM
    },
    drrizky: {
        workingDays: [1, 2, 3], // Senin, Selasa, Rabu
        workingHours: { start: 14, end: 18 } // 2 PM - 6 PM
    },
    dramirul: {
        workingDays: [4, 5, 6], // Kamis, Jum'at, Sabtu
        workingHours: { start: 9, end: 12 } // 9 AM - 12 PM
    },
    drfira: {
        workingDays: [2, 4], // Selasa, Kamis
        workingHours: { start: 9, end: 13 } // 9 AM - 1 PM
    },
    drdayu: {
        workingDays: [2, 4, 6], // Selasa, Kamis, Sabtu
        workingHours: { start: 9, end: 14 } // 9 AM -  2 PM
    },
    dredwina: {
        workingDays: [1, 3, 5], // Senin, Rabu, Kamis
        workingHours: { start: 15, end: 20 } // 3 PM - 8 PM
    },
    dregia: {
        workingDays: [1, 2, 4, 6], // Senin, Selasa, Kamis, Sabtu
        workingHours: { start: 10, end: 15 } // 10 AM - 3 PM
    }
};

function checkAvailability() {
    var selectedDoctor = document.getElementById('doctor').value;
    var selectedDate = new Date(document.getElementById('date').value + 'T' + document.getElementById('time').value);

    // Periksa apakah dokter bekerja pada hari yang dipilih
    var doctorSchedule = doctorSchedules[selectedDoctor];
    var isWorkingDay = doctorSchedule.workingDays.includes(selectedDate.getDay());

    // Periksa apakah dokter bekerja pada jam yang dipilih
    var isWorkingHour = selectedDate.getHours() >= doctorSchedule.workingHours.start &&
                        selectedDate.getHours() <= doctorSchedule.workingHours.end;

    var isAvailable = isWorkingDay && isWorkingHour;

    var availabilityMessage = document.getElementById('availabilityMessage');

    if (isAvailable) {
        availabilityMessage.style.color = 'green';
        availabilityMessage.textContent = 'The doctor schedule is available on that date and time.'; 
    } else {
        availabilityMessage.style.color = 'red';
        availabilityMessage.textContent = 'Sorry, the doctor is not working on that date or time.';
    }
}

function submitForm() {
    // Ambil nilai dari setiap elemen formulir
    var title = document.getElementById('title').value;
    var name = document.getElementById('name').value;
    var birthPlace = document.getElementById('birthPlace').value;
    var birthDate = document.getElementById('birthDate').value;
    var gender = document.getElementById('gender').value;
    var address = document.getElementById('address').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var selectedDoctor = document.getElementById('doctor').value;
    var selectedDate = document.getElementById('date').value;
    var selectedTime = document.getElementById('time').value;

    //kirim server or tampilkan
    console.log("Appointment");
    console.log("Title", title);
    console.log("Name", name);
    console.log("Birth Place", birthPlace);
    console.log("Birth Date", birthDate);
    console.log("Gender", gender);
    console.log("Address", address);
    console.log("Phone", phone);
    console.log("Emai", email);
    console.log("Choose Doctor", selectedDoctor);
    console.log("Choose Date", selectedDate);
    console.log("Choose Time", selectedTime);
}

// submit form
document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah pengiriman form standar
    checkAvailability(); // Panggil fungsi checkAvailability
    submitForm(); // Panggil fungsi submitForm
});