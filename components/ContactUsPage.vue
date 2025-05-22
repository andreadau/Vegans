// src/components/ContactUsPage.vue (or src/views/ContactUsPage.vue if you use a views folder)
<template>
  <div class="contact-us-page">
    <div class="contact-us-top-bar">
      <span class="logo-text">vegan/s</span>
      <span class="symbol-text">//</span>
    </div>

    <div class="background-title-contacts">Contacts</div>

    <main class="form-area-wrapper">
      <h1 class="form-main-title">CONTACTS</h1>
      <div class="form-sub-heading">
        <p class="form-sub-heading-line1">We'd love to hear</p>
        <p class="form-sub-heading-line2">from you</p>
      </div>

      <form @submit.prevent="handleSubmit" class="contact-form">
        <p class="form-intro-text">Hi, vegan/s Team!</p>

        <div class="form-row">
          <span class="form-text">My name is</span>
          <input type="text" v-model="formData.firstName" placeholder="First Name" class="inline-input" required />
          <input type="text" v-model="formData.lastName" placeholder="Last Name" class="inline-input" required />
          <span class="form-text">and I'm writing</span>
        </div>

        <div class="form-row">
          <span class="form-text">on behalf of</span>
          <input type="text" v-model="formData.company" placeholder="Company" class="inline-input company-input" />
          <span class="form-text">. We are interested in getting in</span>
        </div>

        <div class="form-row">
          <span class="form-text">touch with you regarding</span>
          <div class="select-wrapper">
            <select v-model="formData.serviceType" class="inline-select" required>
              <option disabled value="">Service type</option>
              <option value="web-design">Web Design</option>
              <option value="development">Development</option>
              <option value="consulting">Consulting</option>
              <option value="other">Other</option>
            </select>
          </div>
          <span class="form-text">.</span>
        </div>

        <p class="form-text long-text">
          It would be awesome if you can reach out to me to discuss further by email
          <input type="email" v-model="formData.email" placeholder="Email" class="inline-input email-input" required />
          or phone
          <input type="tel" v-model="formData.phone" placeholder="+00 123 4567890" class="inline-input phone-input" />
          .
        </p>

        <p class="form-closing-text">Thanks and talk soon!</p>

        <div class="form-agreement">
          <label class="checkbox-label">
            <input type="checkbox" v-model="formData.agreedToPolicy" required />
            <span class="custom-checkbox"></span>
            I have read and agree to the <a href="/privacy-policy" target="_blank">Privacy Policy</a>
          </label>
          <p class="recaptcha-notice">
            This site is protected by reCAPTCHA and the Google
            <a href="https://policies.google.com/privacy" target="_blank">Privacy Policy</a> and
            <a href="https://policies.google.com/terms" target="_blank">Terms of Service</a> apply.
          </p>
        </div>

        <button type="submit" class="submit-button">SUBMIT</button>
      </form>
    </main>

    <a href="https://wa.me/YOUR_WHATSAPP_NUMBER" class="whatsapp-fab" target="_blank" aria-label="Chat on WhatsApp">
      <span>WhatsApp</span>
    </a>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const formData = reactive({
  firstName: '',
  lastName: '',
  company: '',
  serviceType: '',
  email: '',
  phone: '',
  agreedToPolicy: false,
});

const handleSubmit = () => {
  if (!formData.agreedToPolicy) {
    alert('Please agree to the Privacy Policy.');
    return;
  }
  // Handle form submission logic (e.g., send data to a server)
  console.log('Form submitted:', formData);
  alert('Thank you for your message! We will get back to you soon.');
  // Optionally reset form:
  // Object.keys(formData).forEach(key => formData[key] = (typeof formData[key] === 'boolean' ? false : ''));
};
</script>

<style scoped lang="scss">
/* Ensure required fonts are loaded in your main project:
   - "PPNeueMontreal" (sans-serif)
   - "EditorialNew" (serif, for "from you" and large background "Contacts")
   - "Prata" (serif, an alternative for "from you" if preferred)
*/
@import url('https://fonts.googleapis.com/css2?family=Prata&family=PPNeueMontreal&family=YourEditorialFont&display=swap'); // Replace YourEditorialFont with actual import if needed

.contact-us-page {
  background-color: #121212; // Very dark background
  color: #E0E0E0; // Default light text color
  min-height: 100vh;
  padding: 2rem 3rem;
  box-sizing: border-box;
  font-family: "PPNeueMontreal", sans-serif; // Default sans-serif
  position: relative; // For positioning background text and FAB
  display: flex;
  flex-direction: column;
}

.contact-us-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem; // Space below top bar

  .logo-text {
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: -0.02em; // Slight tightening for "vegan/s"
  }

  .symbol-text {
    font-size: 1.7rem;
  }
}

.background-title-contacts {
  font-family: "EditorialNew", serif; // Or Prata, serif;
  font-size: clamp(10rem, 25vw, 20rem); // Very large
  font-weight: normal;
  color: rgba(204, 204, 204, 0.05); // Very faint
  position: absolute;
  top: 40%; // Adjust for best background placement
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  pointer-events: none;
  user-select: none;
  line-height: 0.8;
  text-align: center;
}

.form-area-wrapper {
  position: relative;
  z-index: 1; // Above background title
  width: 100%;
  max-width: 900px; // Max width for the form content
  margin: 0 auto; // Center the form area
  display: flex;
  flex-direction: column;
  align-items: center; // Center form title and form itself
  padding: 2rem 0;
}

.form-main-title {
  font-family: "PPNeueMontreal", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #a0a0a0; // Dimmer color
  margin-bottom: 2rem;
}

.form-sub-heading {
  text-align: center;
  margin-bottom: 3rem;

  .form-sub-heading-line1 {
    font-family: "PPNeueMontreal", sans-serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 300;
    color: #cccccc;
    margin: 0 0 0.1em 0;
    line-height: 1.2;
  }

  .form-sub-heading-line2 {
    font-family: "EditorialNew", serif; // Or Prata
    font-size: clamp(3rem, 8vw, 5.5rem);
    font-weight: normal;
    color: #ffffff;
    margin: 0;
    line-height: 1.1;
  }
}

.contact-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem; // Space between form elements/rows
  color: #b0b0b0; // Lighter gray for descriptive text
  font-size: 1rem; // Base size for form text
  line-height: 1.8;

  .form-intro-text, .form-closing-text {
    font-size: 1.1rem;
    color: #c0c0c0;
  }

  .form-row, .form-text.long-text {
    display: flex;
    flex-wrap: wrap; // Allow items to wrap on smaller screens
    align-items: baseline; // Align text and inputs nicely
    gap: 0.5em 0.75em; // Row and column gap for items in a row
  }

  .inline-input, .inline-select {
    background: transparent;
    border: none;
    border-bottom: 1px solid #555;
    color: #e0e0e0;
    padding: 0.4em 0.1em;
    font-size: 1rem; // Match surrounding text
    font-family: "PPNeueMontreal", sans-serif; // Match surrounding text
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
      border-bottom-color: #e0e0e0;
    }

    &::placeholder {
      color: #777;
      font-weight: 300;
    }
  }

  .inline-input {
    min-width: 150px; // Base width for inputs
    flex-grow: 1; // Allow inputs to grow
    max-width: 220px; // Max width for inputs like first/last name

    &.company-input {
      min-width: 200px;
      max-width: 300px;
    }
    &.email-input, &.phone-input {
       min-width: 200px;
       flex-basis: 250px; // Give them more space
    }
  }


  .select-wrapper {
    display: inline-block;
    position: relative;
    min-width: 180px; // Adjust as needed
    flex-grow: 1;
    max-width: 250px;

    &::after { // Custom arrow for select
      content: '▼';
      font-size: 0.7em;
      color: #777;
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }
  }
  .inline-select {
    width: 100%;
    appearance: none; // Remove default browser styling
    -webkit-appearance: none;
    -moz-appearance: none;
    padding-right: 20px; // Space for custom arrow
    cursor: pointer;
  }


  .form-agreement {
    margin-top: 1rem;
    font-size: 0.8rem;
    color: #888;

    .checkbox-label {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-bottom: 0.5rem;
      color: #aaa;

      input[type="checkbox"] {
        opacity: 0; // Hide actual checkbox
        width: 0;
        height: 0;
      }

      .custom-checkbox {
        width: 16px;
        height: 16px;
        border: 1px solid #555;
        margin-right: 0.75em;
        display: inline-block;
        position: relative;
        transition: background-color 0.2s ease, border-color 0.2s ease;
      }

      input[type="checkbox"]:checked + .custom-checkbox {
        background-color: #ccc;
        border-color: #ccc;
        &::after {
          content: '✔';
          color: #121212;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(0.9);
          font-size: 12px;
        }
      }
      a {
        color: #aaa;
        text-decoration: underline;
        &:hover {
          color: #ccc;
        }
      }
    }
    .recaptcha-notice {
      font-size: 0.75rem;
      a {
        color: #888;
        text-decoration: underline;
         &:hover {
          color: #aaa;
        }
      }
    }
  }

  .submit-button {
    font-family: "PPNeueMontreal", sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #e0e0e0;
    background: none;
    border: none;
    border-bottom: 1px solid #e0e0e0;
    padding: 0.6em 0.2em;
    cursor: pointer;
    transition: color 0.3s ease, border-color 0.3s ease;
    align-self: flex-start; // Align to the left
    margin-top: 1rem;

    &:hover {
      color: #ffffff;
      border-color: #ffffff;
    }
  }
}

.whatsapp-fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: #25D366; // WhatsApp green
  color: white;
  padding: 0.8rem 1rem;
  border-radius: 25px; // Pill shape or 50% for circle
  text-decoration: none;
  font-family: "PPNeueMontreal", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 100;
  transition: transform 0.2s ease-out;

  &:hover {
    transform: scale(1.05);
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .contact-us-page {
    padding: 1.5rem;
  }

  .contact-us-top-bar {
    margin-bottom: 1rem;
    .logo-text { font-size: 1.3rem; }
    .symbol-text { font-size: 1.5rem; }
  }

  .background-title-contacts {
    font-size: clamp(8rem, 20vw, 15rem); // Slightly smaller on mobile
    top: 30%;
  }
  
  .form-area-wrapper {
    padding: 1rem 0;
  }

  .form-main-title { margin-bottom: 1.5rem; }
  .form-sub-heading { margin-bottom: 2rem; }

  .form-sub-heading .form-sub-heading-line1 { font-size: clamp(1.8rem, 4vw, 2.5rem); }
  .form-sub-heading .form-sub-heading-line2 { font-size: clamp(2.5rem, 7vw, 4.5rem); }

  .contact-form {
    gap: 1.2rem;
    font-size: 0.9rem;
    .form-row, .form-text.long-text {
      flex-direction: column; // Stack elements in a row vertically
      align-items: flex-start; // Align to start when stacked
      gap: 0.3em;
    }
    .inline-input, .select-wrapper, .inline-input.company-input, .inline-input.email-input, .inline-input.phone-input {
      width: 100%; // Full width when stacked
      max-width: 100%;
      min-width: auto;
      flex-basis: auto;
    }
  }
   .submit-button {
    align-self: stretch; // Full width button on mobile
    text-align: center;
  }
  .whatsapp-fab {
    bottom: 1rem;
    right: 1rem;
    padding: 0.7rem 0.9rem;
    font-size: 0.8rem;
  }
}
</style>