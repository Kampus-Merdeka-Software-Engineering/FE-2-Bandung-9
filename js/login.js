const modal = document.getElementById('id01');

function displayModal() {
  if (modal) {
    modal.style.display = 'block';
  }
}

if (modal) {
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}


function logout() {
  try {
    localStorage.removeItem('loggedInUser');
    fetch('/logout', { // Ubah endpoint menjadi '/logout'
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(data => {
      if (data.status === 'success') {
        alert('Logout successful!');
        window.location.href = 'login.html';
      } else {
        alert('Logout failed.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Logout failed. Please try again later.');
    });
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during logout.');
  }
}

// Pada fungsi checkLoginStatus()
function checkLoginStatus() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const logoutButton = document.querySelector('.logout');
  if (loggedInUser && logoutButton) {
    logoutButton.addEventListener('click', function(event) {
      event.preventDefault();
      logout();
    });
    showLoggedInContent();
  } else {
    showLoggedOutContent();
  }
}

// Ubah 'showLoggedInContent()' dan 'showLoggedOutContent()'
function showLoggedInContent() {
  const logoutButton = document.querySelector('.logout');
  const loginButton = document.querySelector('.login'); // Tambahkan variabel untuk tombol login jika perlu
  if (logoutButton) {
    logoutButton.style.display = 'block';
  }
  if (loginButton) {
    loginButton.style.display = 'none'; // Sembunyikan tombol login jika perlu
  }
}

function showLoggedOutContent() {
  const logoutButton = document.querySelector('.logout');
  const loginButton = document.querySelector('.login'); // Tambahkan variabel untuk tombol login jika perlu
  if (logoutButton) {
    logoutButton.style.display = 'none'; // Sembunyikan tombol logout jika perlu
  }
  if (loginButton) {
    loginButton.style.display = 'block';
  }
}

// Function signUp() dan logIn() tetap sama

document.querySelector('.logout').addEventListener('click', function(event) {
  event.preventDefault();
  logout();
});

document.querySelector('.signup').addEventListener('click', function(event) {
  event.preventDefault();
  signup();
});

document.querySelector('.btn').addEventListener('click', function(event) {
  event.preventDefault();
  logIn();
});

// Panggil fungsi checkLoginStatus() untuk memeriksa status login saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
  checkLoginStatus();
});