// 03-feedback.js
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

// Отримання збереженого стану форми після перезавантаження сторінки
const savedState = JSON.parse(localStorage.getItem(storageKey));
if (savedState) {
  emailInput.value = savedState.email;
  messageInput.value = savedState.message;
}

// Збереження стану форми в локальному сховищі з затримкою
const saveStateToLocalStorage = throttle(function () {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(state));
}, 500); // Затримка в 500 мс (півсекунди)

// Відстежування події input для полів форми
form.addEventListener('input', saveStateToLocalStorage);

// Обробка події submit форми
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };

  // Очищення локального сховища
  localStorage.removeItem(storageKey);

  // Очищення полів форми
  emailInput.value = '';
  messageInput.value = '';

  console.log('Form state:', state);
});
