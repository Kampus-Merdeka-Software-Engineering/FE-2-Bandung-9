var modal = document.getElementById('id01');

// Tambahkan fungsi displayModal()
function displayModal() {
  if (modal) {
    modal.style.display = "block";
  }
}


// Tambahkan pengecekan apakah modal ditemukan atau tidak sebelum menetapkan event onclick
if (modal) {
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

// Menampilkan alert dan respons ketika signup
// Event listener untuk tombol signup
document.querySelector(".signupbtn").addEventListener("click", function(event) {
  event.preventDefault();

  const fullname = document.querySelector('input[name="fullname"]').value;
  const username = document.querySelector('input[name="username"]').value;
  const email = document.querySelector('input[name="signupemail"]').value;
  const password = document.querySelector('input[name="signuppassword"]').value;

  if (!fullname || !username || !email || !password) {
    alert('Semua kolom harus diisi.');
    return;
  }

  const data = {
    fullname: fullname,
    username: username,
    email: email,
    password: password
  };

  fetch('http://localhost:3000/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  })
  .then(data => {
    if (data.status === 'success') {
      alert('Signup successful!');
      // Menampilkan respons yang terstruktur di halaman
      var userInfo = document.createElement('div');
      userInfo.innerHTML = `
        <p>Status: ${data.status}</p>
        <p>Message: ${data.message}</p>
        <p>User:</p>
        <ul>
          <li>Full Name: ${data.user.fullname}</li>
          <li>Username: ${data.user.username}</li>
          <li>Email: ${data.user.email}</li>
        </ul>
      `;
      document.body.appendChild(userInfo); // Menambahkan informasi pengguna ke halaman
    } else {
      alert('Signup failed.');
    }
    console.log('Failed signup attempt with email:', data.email);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Signup failed. Please try again later.');
  });
});



// menampilkan alert dan respons ketika login
document.querySelector(".btn").addEventListener("click", function(event) {
  event.preventDefault();

  const email = document.querySelector('input[name="loginemail"]').value;
  const password = document.querySelector('input[name="loginpassword"]').value;

  if (!email || !password) {
    alert('Email dan password harus diisi.');
    return;
  }
  const data = {
    email: email,
    password: password
  };  
  
  fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Tambahkan header untuk JSON
    },
    body: JSON.stringify(data) // Ubah ke JSON sebelum mengirim
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  })
  .then(data => {
    if (data.status === 'success') {
      alert('Login successful!');

      const logoutButton = document.querySelector('.logout');
    if (logoutButton) {
      logoutButton.style.display = 'block';
    }
      // Menampilkan respons yang terstruktur di halaman
      var userInfo = document.createElement('div');
      userInfo.innerHTML = `
        <p>Status: ${data.status}</p>
        <p>Message: ${data.message}</p>
        <p>User:</p>
        <ul>
          <li>Full Name: ${data.user.fullname}</li>
          <li>Username: ${data.user.username}</li>
          <li>Email: ${data.user.email}</li>
        </ul>
      `;
      document.body.appendChild(userInfo); // Menambahkan informasi pengguna ke halaman
    } else {
      alert('Login failed. Invalid email or password.');
    }
    console.log('Failed login attempt with email:', data.email);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Login failed. Please try again later.');
  });
});


// Fungsi logout
// Menambahkan event listener untuk tombol logout
document.querySelector(".logout").addEventListener("click", function(event) {
  event.preventDefault();
  logout();
});
function logout() {
  fetch('http://localhost:3000/api/logout', {
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
      // Hapus informasi yang tersimpan (Contoh: data pengguna)
      localStorage.removeItem('userData'); // Hapus data pengguna dari localStorage

      // Redirect ke halaman login
      window.location.href = 'login.html';
    } else {
      alert('Logout failed.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Logout failed. Please try again later.');
  });
}
