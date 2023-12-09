const API_BASE_URL = "https://lively-necklace-crab.cyclic.app/";

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
    fetch(`${API_BASE_URL}/logout`, { // Ubah endpoint menjadi '/logout'
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

function signup() {
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

  fetch(`${API_BASE_URL}/signup`, {  
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
      const userInfo = document.createElement('div');
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
      document.body.appendChild(userInfo);
      localStorage.setItem('loggedInUser', JSON.stringify(data.user));
      window.location.href = 'index.html';
    } else {
      alert('Signup failed.');
    }
    console.log('Failed signup attempt with email:', data.email);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Signup failed. Please try again later.');
  });
}

function login() {
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
  
  fetch(`${API_BASE_URL}/login`, { 
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
      alert('Login successful!');
      localStorage.setItem('loggedInUser', JSON.stringify(data.user));
      showLoggedInContent();
      window.location.href = 'index.html'; 

      const userInfo = document.createElement('div');
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
      document.body.appendChild(userInfo);
    } else {
      alert('Login failed. Invalid email or password.');
    }
    console.log('Failed login attempt with email:', data.email);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Login failed. Please try again later.');
  });
}

document.querySelector('.signup').addEventListener('click', function(event) {
  event.preventDefault();
  signup();
});

document.querySelector('.btn').addEventListener('click', function(event) {
  event.preventDefault();
  login();
});
