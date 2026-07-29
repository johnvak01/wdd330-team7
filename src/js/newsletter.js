// newsletter logic
const newsletterForm = document.querySelector("#newsletter-form");
const message = document.querySelector("#newsletter-message");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!newsletterForm.checkValidity()) {
      newsletterForm.reportValidity();
      return;
    }

    const name = document.querySelector("#newsletter-name").value.trim();

    newsletterForm.reset();

    message.textContent = `Thank you, ${name}! You have successfully subscribed to our newsletter.`;

    message.className = "newsletter-message success";
    message.classList.remove("hide");
  });
}
