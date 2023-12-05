// Ambil data dari localStorage saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Periksa apakah ada pengguna yang login
    if (loggedInUser) {
        // Isi elemen HTML dengan data pengguna dari localStorage
        document.getElementById('fullName').textContent = loggedInUser.fullname;
        document.getElementById('username').textContent = loggedInUser.username;
        document.getElementById('email').textContent = loggedInUser.email;
    } else {
        // Redirect ke halaman login jika tidak ada pengguna yang login
        window.location.href = 'login.html';
    }
});