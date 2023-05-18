import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

// Retrieving the saved state of the form after a page reload
const savedState = JSON.parse(localStorage.getItem(storageKey));
if (savedState) {
  emailInput.value = savedState.email;
  messageInput.value = savedState.message;
}

// Saving form state to local storage with delay
const saveStateToLocalStorage = throttle(function () {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(state));
}, 500); // delay в 500 ms

// Input event tracking for form fields
form.addEventListener('input', saveStateToLocalStorage);

// Processing the form submit event
form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Validation - empty text
  if (!emailInput.value || !messageInput.value) {
    alert('Enter text, please');
    return;
  }

  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };

  // Cleaning local storage
  localStorage.removeItem(storageKey);

  // Cleaning form fields
  form.reset();

  console.log('Form state:', state);
});
