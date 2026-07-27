import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const service = new ExternalServices();
const checkout = new CheckoutProcess("so-cart", service);

// Display order totals when the page loads
checkout.displayTotals();

// Recalculate totals when the ZIP code changes
const zip = document.querySelector("#zip");

if (zip) {
  zip.addEventListener("blur", () => {
    checkout.displayTotals();
  });
}

const form = document.forms.checkout;

const checkoutLayout = document.querySelector(".checkout-layout");
const successMessage = document.querySelector("#checkout-success");

const errorBox = document.querySelector("#checkout-error");
const errorMessage = document.querySelector("#checkout-error-message");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Hide any previous error message
    if (errorBox) {
      errorBox.classList.add("hide");
      errorMessage.textContent = "";
    }

    try {
      // Submit the order
      await checkout.checkout(form);

      // Clear the shopping cart
      localStorage.removeItem("so-cart");

      // Reset the form
      form.reset();

      // Hide checkout form and display success message
      if (checkoutLayout) {
        checkoutLayout.classList.add("hide");
      }

      if (successMessage) {
        successMessage.classList.remove("hide");
      }
    } catch (error) {
      let message = "Unable to complete your order.";

      try {
        // Parse server validation errors
        const serverErrors = JSON.parse(error.message);

        if (typeof serverErrors === "object") {
          message = Object.values(serverErrors).join(", ");
        } else {
          message = error.message;
        }
      } catch {
        message = error.message;
      }

      if (errorBox && errorMessage) {
        errorMessage.textContent = message;
        errorBox.classList.remove("hide");

        errorBox.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  });
}
