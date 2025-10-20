// Initialize EmailJS with your public key
(function() {
    emailjs.init("FYv29pOIdfK6A1YFA");
})();

// Set modal title
document.getElementById('ethan').textContent = "Send a message to Ethan James Walker";

// DOM Elements - Declare all at once
const sendMessageBtn = document.getElementById('btn-sand');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalOverlay = document.getElementById('modalOverlay');
const contactForm = document.getElementById('contactForm');
const loadingDiv = document.getElementById('loding');
const submitBtn = document.getElementById('mysubmit');

// Open Modal
sendMessageBtn.addEventListener('click', () => {
    modalOverlay.style.display = "flex";
});

// Close Modal
closeModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalOverlay.style.display = "none";
    resetForm();
});

// Close modal when clicking outside the form
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = "none";
        resetForm();
    }
});

// Handle Form Submission with EmailJS
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('textarea').value.trim();
    
    // Validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Disable submit button and show loading
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';
    submitBtn.textContent = 'Sending...';
    
    // Hide form fields
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.style.display = 'none';
    });
    
    // Show loading animation
    loadingDiv.style.display = 'block';
    document.getElementById('userName').textContent = `Hello ${name}!`;
    
    // Prepare template parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_name: 'Ethan James Walker'
    };
    
    // Send email using EmailJS
    emailjs.send('service_mf8x4vq', 'template_itjhopu', templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
            document.getElementById('notif').innerHTML = '✓ Message sent successfully!';
            document.getElementById('notif').style.color = '#28a745';
            document.getElementById('notif').style.fontSize = '20px';
            
            // Close modal after 2.5 seconds
            setTimeout(() => {
                modalOverlay.style.display = 'none';
                resetForm();
            }, 2500);
        })
        .catch((error) => {
            console.error('FAILED...', error);
            
            // Show error message
            document.getElementById('notif').innerHTML = '✗ Failed to send. Please try again.';
            document.getElementById('notif').style.color = '#dc3545';
            document.getElementById('notif').style.fontSize = '18px';
            
            // Reset form after error
            setTimeout(() => {
                resetForm();
            }, 2500);
        });
});

// Reset Form Function
function resetForm() {
    contactForm.reset();
    loadingDiv.style.display = 'none';
    submitBtn.style.display = 'block';
    document.getElementById('notif').textContent = 'Your message is being sent...';
    document.getElementById('notif').style.color = '#333';
    document.getElementById('userName').textContent = '';
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
        modalOverlay.style.display = 'none';
        resetForm();
    }
});