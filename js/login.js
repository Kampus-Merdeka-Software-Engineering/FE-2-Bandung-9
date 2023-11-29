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

// // Ganti fetch login dengan fungsi untuk menampilkan alert dan respons
// document.querySelector(".btn").addEventListener("click", function(event) {
//   event.preventDefault();
//   var formData = new FormData(document.querySelector('form.container'));
//   fetch('http://localhost:3000/api/login', {
//     method: 'POST',
//     body: formData
//   })
//   .then(response => response.json())
//   .then(data => {
//     if (data.status === 'success') {
//       alert('Login successful!');
//       // Menampilkan respons yang terstruktur di halaman
//       var userInfo = document.createElement('div');
//       userInfo.innerHTML = `
//         <p>Status: ${data.status}</p>
//         <p>Message: ${data.message}</p>
//         <p>User:</p>
//         <ul>
//           <li>Full Name: ${data.user.fullname}</li>
//           <li>Username: ${data.user.username}</li>
//           <li>Email: ${data.user.email}</li>
//         </ul>
//       `;
//       document.body.appendChild(userInfo); // Menambahkan informasi pengguna ke halaman
//     } else {
//       alert('Login failed. Invalid email or password.');
//     }
//     console.log('Failed login attempt with email:', formData.get('email'));
//   })
//   .catch(error => {
//     console.error('Error:', error);
//     alert('Login failed. Please try again later.');
//   });
// });