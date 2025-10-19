document.getElementById('ethan').textContent = "Send a message to James Walker";

const sendMessage = document.getElementById('btn-sand');
const closeBox = document.getElementById('closeModalBtn');
const modalOverlay = document.getElementById('modalOverlay');

sendMessage.addEventListener('click', () => {
  modalOverlay.style.display = "flex";
});

closeBox.addEventListener('click', () => {
  modalOverlay.style.display = "none";
});

// Close popup by clicking outside the form
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = "none";
  }
});
