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

function updateTimeOptions() {
    const selectedDoctor = document.getElementById('doctor').value;
    const selectedDate = new Date(document.getElementById('date').value);
    const timeSelect = document.getElementById('time');

    // Reset pilihan waktu
    timeSelect.innerHTML = '';

    // Periksa apakah dokter bekerja pada hari yang dipilih
    const doctorSchedule = doctorSchedules[selectedDoctor];
    if (doctorSchedule && doctorSchedule.workingDays.includes(selectedDate.getDay())) {
        const startHour = doctorSchedule.workingHours.start;
        const endHour = doctorSchedule.workingHours.end;

        // Tambahkan opsi waktu pada select
        for (let hour = startHour; hour <= endHour; hour++) {
            const option = document.createElement('option');
            option.value = `${hour}:00`;
            option.textContent = `${hour}:00`;
            timeSelect.appendChild(option);
        }
    } else {
        const option = document.createElement('option');
        option.textContent = 'The doctor is not working today';
        timeSelect.appendChild(option);
    }
}

// Panggil updateTimeOptions saat halaman dimuat untuk menetapkan jadwal awal
document.addEventListener('DOMContentLoaded', updateTimeOptions);

function submitForm() {
    // Ambil nilai dari setiap elemen formulir
    var title = document.getElementById('title').value;
    var name = document.getElementById('name').value;
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