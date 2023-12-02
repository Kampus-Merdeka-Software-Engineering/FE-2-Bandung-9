// Tambahkan pada appointment.html sebelum menampilkan konten appointment
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/checkloginstatus')
      .then(response => response.json())
      .then(data => {
        if (data.loggedIn !== true) {
          window.location.href = 'login.html'; // Redirect ke halaman login jika tidak ada sesi login
        }
      })
      .catch(error => {
        console.error('Error checking login status:', error);
      });
  });

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

function checkFormValidity() {
    const form = document.getElementById('appointmentForm');
    if (form.checkValidity()) {
        submitForm();
    } else {
        alert('Harap lengkapi semua bidang formulir dengan benar.');
    }
}

function submitForm() {
    const data = {
        // Ambil nilai dari input form dengan benar
        title: document.getElementById('title').value,
        name: document.getElementById('name').value,
        birthdate: document.getElementById('birthdate').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        doctor: document.getElementById('doctor').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
    };

    // Proses pengiriman data ke server
    fetch('http://localhost:3000/api/appointmentForm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            alert('Appointment created successfully!');
        } else {
            throw new error('Appointment failed'); // Alert jika appointment gagal
        }
    })
    .catch(error => {
        console.error('There was a problem with the appointment request:', error.message);
        if (error.response) {
            console.log('Server error response:', error.response.data);
        }
        alert('Failed to create appointment. Please try again.');
    });
}