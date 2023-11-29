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
}

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

function checkAvailability() {
    const selectedDoctor = document.getElementById('doctor').value;
    const selectedDate = new Date(document.getElementById('date').value);
    const selectedTime = document.getElementById('time').value;

    const doctorSchedule = doctorSchedules[selectedDoctor];

    if (
        doctorSchedule &&
        doctorSchedule.workingDays.includes(selectedDate.getDay())
    ) {
        const startHour = doctorSchedule.workingHours.start;
        const endHour = doctorSchedule.workingHours.end;
        const selectedHour = parseInt(selectedTime.split(':')[0], 10);

        if (selectedHour >= startHour && selectedHour <= endHour) {
            console.log('Doctor is available at the selected time.');
            // Lakukan proses pengiriman formulir di sini
            submitForm();
        } else {
            console.log('Doctor is not available at the selected time.');
            // Tampilkan pesan bahwa dokter tidak tersedia pada waktu tersebut
        }
    } else {
        console.log('Doctor is not working on the selected date.');
        // Tampilkan pesan bahwa dokter tidak bekerja pada tanggal tersebut
    }
}

function submitForm() {
    console.log('Submitting form...');
    // Ambil nilai dari setiap elemen formulir
    var title = document.getElementById('title').value;
    var name = document.getElementById('name').value;
    var birthDate = document.getElementById('birthdate').value;
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
    console.log("Email", email);
    console.log("Choose Doctor", selectedDoctor);
    console.log("Choose Date", selectedDate);
    console.log("Choose Time", selectedTime);

    fetch('http://localhost:3000/api/appointmentForm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            name: name,
            birthdate: birthDate,
            gender: gender,
            address: address,
            phone: phone,
            email: email,
            doctor: selectedDoctor,
            date: selectedDate,
            time: selectedTime
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle response data here
        console.log('Appointment created successfully:', data);
        alert('Appointment created successfully!');
    })
    .catch(error => {
        console.error('There was a problem with the appointment request:', error.message);
        alert('Failed to create appointment. Please try again.');
        // Handle error message, display to user, etc.
    });
    console.log('Form submitted!');
}
