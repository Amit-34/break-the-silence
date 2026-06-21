/**
 * Contact form handling example:
 *   - client-side validation with accessible error messages
 *   - simulated async submit (replace with a real api.post call)
 *   - success / error UI feedback
 */
import { qs, on } from '../utils/dom.js';
import { isValidEmail } from '../utils/helpers.js';

export function initContactForm() {
  const form = qs('[data-contact-form]');
  if (!form) {
    return;
  }

  const status = qs('[data-form-status]', form);

  const showError = (field, message) => {
    const errorEl = qs(`[data-error-for="${field.name}"]`, form);
    field.setAttribute('aria-invalid', 'true');
    if (errorEl) {
      errorEl.textContent = message;
    }
  };

  const clearError = (field) => {
    const errorEl = qs(`[data-error-for="${field.name}"]`, form);
    field.removeAttribute('aria-invalid');
    if (errorEl) {
      errorEl.textContent = '';
    }
  };

  /** @returns {boolean} whether the form is valid */
  const validate = () => {
    let valid = true;
    const { name, email, message } = form.elements;

    [name, email, message].forEach(clearError);

    if (!name.value.trim()) {
      showError(name, 'Please enter your name.');
      valid = false;
    }
    if (!isValidEmail(email.value)) {
      showError(email, 'Please enter a valid email address.');
      valid = false;
    }
    if (message.value.trim().length < 10) {
      showError(message, 'Message must be at least 10 characters.');
      valid = false;
    }
    return valid;
  };

  // Re-validate a field as the user fixes it.
  ['input', 'blur'].forEach((evt) =>
    on(form, evt, (e) => {
      if (e.target.matches('input, textarea') && e.target.getAttribute('aria-invalid')) {
        clearError(e.target);
      }
    }),
  );

  on(form, 'submit', async (event) => {
    event.preventDefault();
    if (status) {
      status.textContent = '';
      status.className = 'text-sm';
    }

    if (!validate()) {
      return;
    }

    const submitBtn = qs('[type="submit"]', form);
    submitBtn.disabled = true;
    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';

    try {
      // Simulate a network request. Replace with:
      // await api.post('/contact', Object.fromEntries(new FormData(form)));
      await new Promise((resolve) => setTimeout(resolve, 900));

      form.reset();
      if (status) {
        status.textContent = 'Thanks! Your message has been sent.';
        status.className = 'text-sm font-medium text-green-600';
      }
    } catch (error) {
      console.error('Contact form submit failed:', error);
      if (status) {
        status.textContent = 'Something went wrong. Please try again later.';
        status.className = 'text-sm font-medium text-red-600';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
}
