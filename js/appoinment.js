const API_BASE_URL = "https://be-2-bandung-9-production.up.railway.app"

document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
  });
  
  function checkLoginStatus() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      // User sudah login, izinkan akses ke halaman appointment
      window.location.href = 'appoinment.html';
    } else {
      // User belum login, biarkan mereka berada di halaman sebelumnya
      redirectToLogin();
    }
  }
  
  function redirectToLogin() {
    // Ambil URL halaman sebelumnya
    const previousPage = document.referrer;
    // Jika halaman sebelumnya bukan halaman login, kembalikan ke halaman sebelumnya
    if (!previousPage.includes('login.html')) {
      window.history.back();
    } else {
      // Jika halaman sebelumnya adalah halaman login, alihkan ke halaman index
      window.location.href = 'index.html';
    }
  }

const doctorSchedules = {
    Dr_Anggoro: {
        workingDays: [1, 3, 5], // Senin, Rabu, Jumat
        workingHours: { start: 9, end: 14 } // 9 AM - 2 PM
    },
    Dr_Vito: {
        workingDays: [2, 4, 6], // Selasa, Kamis, Sabtu
        workingHours: { start: 15, end: 20 } // 3 PM - 8 PM
    },
    Drg_Rizky: {
        workingDays: [1, 2, 3], // Senin, Selasa, Rabu
        workingHours: { start: 14, end: 18 } // 2 PM - 6 PM
    },
    Drg_amirul: {
        workingDays: [4, 5, 6], // Kamis, Jum'at, Sabtu
        workingHours: { start: 9, end: 12 } // 9 AM - 12 PM
    },
    Dr_fira: {
        workingDays: [2, 4], // Selasa, Kamis
        workingHours: { start: 9, end: 13 } // 9 AM - 1 PM
    },
    Dr_dayu: {
        workingDays: [2, 4, 6], // Selasa, Kamis, Sabtu
        workingHours: { start: 9, end: 14 } // 9 AM -  2 PM
    },
    Dr_edwina: {
        workingDays: [1, 3, 5], // Senin, Rabu, Kamis
        workingHours: { start: 15, end: 20 } // 3 PM - 8 PM
    },
    Dr_egia: {
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
    const time = document.getElementById('time').value;
    const formattedTime = new Date().toISOString().substr(0, 11) + time + ":00.000Z";
    
    const data = {
        title: document.getElementById('title').value,
        name: document.getElementById('name').value,
        birthdate: new Date(document.getElementById('birthdate').value).toISOString(),
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        doctor: document.getElementById('doctor').value,
        date:  new Date(document.getElementById('date').value).toISOString(),
        time: formattedTime
    };

    fetch(`${API_BASE_URL}/appointment`, {
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
            alert('Congratulations, your doctor\'s appointment booking was successful! Please come at the appointed time.');
        } else {
            throw new Error('Appointment failed');
        }
    })
    .catch(error => {
        console.error('There was a problem with the appointment request:', error.message);
        alert('Failed to create an appointment. Please try again.');
    });
}