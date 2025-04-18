document.addEventListener('DOMContentLoaded', function() {
    // ==============================
    // Navigation Bar: Profile Dropdown
    // ==============================
    const profileIcon = document.getElementById('profileIcon');
    const dropdown = document.getElementById('dropdownMenu');
    const dateInput = document.getElementById('appointment-date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  
    if (profileIcon && dropdown) {
      // Toggle dropdown when clicking the profile icon
      profileIcon.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent click from bubbling up
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
      });
    
      // Hide the dropdown if clicking anywhere outside of it
      document.addEventListener('click', function() {
        dropdown.style.display = 'none';
      });
    }
  
    
    
    // ==============================
    // GSAP Animations for Info Panel Content
    // ==============================
    gsap.to('.info-content h2', {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.2
    });
    
    gsap.to('.info-content p', {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.4
    });
    
    // ==============================
    // Form Submission Handler
    // ==============================
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
      e.preventDefault();
  
      // ==== Validation ====
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const age = parseInt(document.getElementById('age').value.trim());
      const gender = document.getElementById('gender').value;
      const disease = document.getElementById('disease').value;
      const blood = document.getElementById('blood').value;
      const doctor = document.getElementById('doctor')?.value || ""; // optional chaining
      const address = document.getElementById('address').value.trim();
      const date = document.getElementById('appointment-date').value;
      const time = document.getElementById('appointment-time').value;
  
      if (!name || !email || !phone || !age || !gender || !disease || !blood || !doctor || !address || !date || !time) {
        alert('Please fill in all required fields.');
        return;
      }
  
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
  
      if (!/^\d{10}$/.test(phone)) {
        alert('Please enter a 10-digit phone number.');
        return;
      }
  
      if (age < 1 || age > 120 || isNaN(age)) {
        alert('Please enter a valid age between 1 and 120.');
        return;
      }
  
      // ==== Show loading spinner ====
      const loading = document.querySelector('.loading');
      if (loading) {
        loading.style.display = 'flex';
      }
  
      // ==== Simulate API call ====
      setTimeout(() => {
        if (loading) {
          loading.style.display = 'none';
        }
  
        // ==== Show success message ====
        const successMessage = document.querySelector('.success-message');
        if (successMessage) {
          successMessage.style.transform = 'translateX(0)';
          setTimeout(() => {
            successMessage.style.transform = 'translateX(200%)';
          }, 3000);
        }
  
        // ==== Reset the form ====
        registrationForm.reset();
      }, 1500);
  
      });
    }
  });
  
  