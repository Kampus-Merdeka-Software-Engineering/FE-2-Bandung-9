// Ambil data dari localStorage saat halaman dimuat

const API_BASE_URL = "https://lively-necklace-crab.cyclic.app/";

document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Periksa apakah ada pengguna yang login
    if (loggedInUser) {
        // Isi elemen HTML dengan data pengguna dari localStorage
        document.getElementById('fullName').textContent = loggedInUser.fullname;
        document.getElementById('username').textContent = loggedInUser.username;
        document.getElementById('email').textContent = loggedInUser.email;

        // Tambahkan event listener untuk tombol logout
        const logoutButton = document.querySelector('.logout');
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault(); // Hindari pengiriman default dari link

            // Lakukan permintaan logout ke server
            fetch(`${API_BASE_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Logout failed');
            })
            .then(data => {
                alert(data.message); // Tampilkan pesan alert dari server
                localStorage.removeItem('loggedInUser'); // Hapus data dari localStorage
                window.location.href = 'login.html'; // Redirect ke halaman login setelah logout berhasil
            })
            .catch(error => {
                console.error('Logout error:', error);
                alert('Logout failed');
            });
        });
    } else {
        // Redirect ke halaman login jika tidak ada pengguna yang login
        window.location.href = 'login.html';
    }
});