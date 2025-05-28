document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("[data-js-form]");
  const errorMessages = document.querySelectorAll("[data-js-form-field-errors]");

  // Function to display error
  function showError(input, message) {
    let errorElement = input.nextElementSibling;
  
    if (input.type === "radio") {
      errorElement = document.getElementById("request-type-errors");
    } else if (input.type === "checkbox") {
      errorElement = document.getElementById("agreement-errors");
    } else if (input.id === "message") {
      errorElement = document.getElementById("message-errors");
    }
  
    if (errorElement) {
      errorElement.textContent = message;
      input.setAttribute("aria-invalid", "true");
    }
  }
  

  // Function to clear error
  function clearError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.hasAttribute('data-js-form-field-errors')) {
      errorElement.textContent = "";
    }
    input.setAttribute("aria-invalid", "false");
  }

  // Field validation
  function validateField(input) {
    if (input.validity.valid) {
      clearError(input);
    } else {
      if (input.validity.valueMissing) {
        showError(input, "This field is required.");
      } else if (input.type === "email") {
        showError(input, "Please enter a valid email address.");
      } else {
        showError(input, "Invalid input.");
      }
    }
  }

  // Radio button validation
  function validateRadioButtons(radioButtons) {
    const isChecked = Array.from(radioButtons).some((radio) => radio.checked);
    const errorEl = document.getElementById("request-type-errors");
  
    if (!isChecked) {
      errorEl.textContent = "Please select a query type.";
    } else {
      errorEl.textContent = "";
    }
  }  

  // Checkbox validation
  function validateCheckbox(checkbox) {
    const errorElement = document.getElementById("agreement-errors");
  
    if (!checkbox.checked) {
      errorElement.textContent = "To submit this form, please consent to being contacted.";
      checkbox.setAttribute("aria-invalid", "true");
    } else {
      errorElement.textContent = "";
      checkbox.setAttribute("aria-invalid", "false");
    }
  }  

  // textarea Message validation
  function validateMessage(textarea) {
    const errorElement = document.getElementById("message-errors");
    if (!textarea.value.trim()) {
      errorElement.textContent = "Message cannot be empty.";
      textarea.setAttribute("aria-invalid", "true");
    } else {
      errorElement.textContent = "";
      textarea.setAttribute("aria-invalid", "false");
    }
  }
  

  // Form Submission Handler
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Validation of all fields
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => validateField(input));

    // Radio button validation
    const radioButtons = form.querySelectorAll('input[type="radio"]');
    validateRadioButtons(radioButtons);

    // Checkbox validation
    const checkbox = form.querySelector('input[type="checkbox"]');
    validateCheckbox(checkbox);

    // Message textarea validation
    const messageTextarea = form.querySelector('textarea[name="message"]');
    if (messageTextarea) {
      validateMessage(messageTextarea);
    }

    // Checking for errors
    const hasErrors = Array.from(errorMessages).some(
      (error) => error.textContent !== ""
    );

    if (!hasErrors) {
      form.reset();
      errorMessages.forEach((el) => (el.textContent = ""));
      form.querySelectorAll("[aria-invalid]").forEach((el) => el.setAttribute("aria-invalid", "false"));
    
      // Showing the message
      const successMsg = document.getElementById("form-success");
      successMsg.classList.remove("visually-hidden");
      successMsg.classList.add("show");
    
      // Hiding the msg
      setTimeout(() => {
        successMsg.classList.remove("show");
        successMsg.classList.add("hide");
      }, 3000);
    
      // Hiding fully
      setTimeout(() => {
        successMsg.classList.add("visually-hidden");
        successMsg.classList.remove("hide");
      }, 4000);
    }
      
      // You can also reset aria-invalid:
      form.querySelectorAll("[aria-invalid]").forEach((el) => el.setAttribute("aria-invalid", "false"));
     }
   );

   // Input processing for all fields
   form.querySelectorAll("input, textarea").forEach((input) => {
     input.addEventListener("input", () => validateField(input));
   });

   // Handling radio button changes
   form.querySelectorAll('input[type="radio"]').forEach((radio) => {
     radio.addEventListener("change", () => {
       validateRadioButtons(form.querySelectorAll('input[type="radio"]'));
     });
   });

   // Handling checkbox changes
   const checkbox = form.querySelector('input[type="checkbox"]');
   if (checkbox) {
     checkbox.addEventListener("change", () => validateCheckbox(checkbox));
   }
});