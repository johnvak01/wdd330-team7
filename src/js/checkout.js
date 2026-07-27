import { loadHeaderFooter, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const service = new ExternalServices();
const checkout = new CheckoutProcess("so-cart", service);

// Display order totals
checkout.displayTotals();

// Update totals whenever the ZIP code changes
const zip = document.querySelector("#zip");

if (zip) {
  zip.addEventListener("blur", () => {
    checkout.displayTotals();
  });
}

// Checkout form
const form = document.forms.checkout;

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // HTML5 validation
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      // Submit order
      await checkout.checkout(form);

      // Clear shopping cart
      localStorage.removeItem("so-cart");

      // Redirect to success page
      window.location.href = "/checkout/success.html";
    } catch (error) {
      let message = "Unable to complete your order.";

      if (error?.message) {
        if (typeof error.message === "object") {
          message = Object.values(error.message).join("<br>");
        } else {
          message = error.message;
        }
      }

      alertMessage(message, true);
    }
  });
}
