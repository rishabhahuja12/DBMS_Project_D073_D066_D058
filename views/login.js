function toggleForm(formType) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const buttons = document.querySelectorAll('.toggle-btn');
    
    if (formType === 'login') {
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
      buttons[0].classList.add('active');
      buttons[1].classList.remove('active');
      document.getElementById('login-email').focus();

    } else {
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
      buttons[0].classList.remove('active');
      buttons[1].classList.add('active');
      document.getElementById('signup-name').focus();

    }
  }

  // Profile Icon Dropdown Toggle
  document.getElementById('profileIcon').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the click from propagating to the document
    const dropdown = document.getElementById('dropdownMenu');
    // Toggle dropdown display between 'block' and 'none'
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  });

  // Hide the dropdown menu if clicking anywhere outside of it
  document.addEventListener('click', function() {
    const dropdown = document.getElementById('dropdownMenu');
    if (dropdown) {
      dropdown.style.display = 'none';
    }
  });

  // Show login form by default on page load
window.onload = function () {
toggleForm('login');
};

function togglePassword(inputId, icon) {
const input = document.getElementById(inputId);
if (input.type === "password") {
  input.type = "text";
  icon.textContent = "🙈";
} else {
  input.type = "password";
  icon.textContent = "👁️";
}
}

// LOGIN FORM VALIDATION
document.getElementById('login-form').addEventListener('submit', function (e) {
e.preventDefault(); // Prevent form from submitting

const email = document.getElementById('login-email').value.trim();
const password = document.getElementById('login-password').value.trim();

if (email === '' || password === '') {
  alert('Please fill in all login fields.');
  return;
}

if (!email.includes('@') || !email.includes('.')) {
  alert('Please enter a valid email address.');
  return;
}

// Simulate successful login
alert('Login successful!');
this.reset(); // Reset the form
});


// SIGNUP FORM VALIDATION
document.getElementById('signup-form').addEventListener('submit', function (e) {
e.preventDefault();

const name = document.getElementById('signup-name').value.trim();
const email = document.getElementById('signup-email').value.trim();
const pass = document.getElementById('signup-password').value.trim();
const confirm = document.getElementById('signup-confirm').value.trim();

if (name === '' || email === '' || pass === '' || confirm === '') {
  alert('Please fill in all signup fields.');
  return;
}

if (!email.includes('@') || !email.includes('.')) {
  alert('Please enter a valid email address.');
  return;
}

if (pass !== confirm) {
  alert('Passwords do not match.');
  return;
}

if (pass.length < 6) {
  alert('Password must be at least 6 characters.');
  return;
}

// Simulate successful signup
alert('Signup successful!');
this.reset();
});
