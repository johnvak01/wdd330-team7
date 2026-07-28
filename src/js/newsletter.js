// newsletter logic

const newsletterForm = document.querySelector("#newsletter-form");

const message = document.querySelector("#newsletter-message");

const nameInput = document.querySelector("#newsletter-name");
const emailInput = document.querySelector("#newsletter-email");

const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let valid = true;

    // Clear previous messages
    nameError.textContent = "";
    emailError.textContent = "";

    message.classList.add("hide");

    // Validate name
    const name = nameInput.value.trim();

    if (name.length < 2) {
      nameError.textContent = "Please enter your full name.";
      valid = false;
    }

    // Validate email
    if (!emailInput.checkValidity()) {
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    }

    // Stop submission if invalid
    if (!valid) {
      return;
    }

    // Success message
    message.textContent = `Thank you ${name}! You have successfully subscribed to our newsletter.`;

    message.className = "newsletter-message success";
    newsletterForm.reset();
  });
}
