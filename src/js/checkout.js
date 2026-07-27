import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const service = new ExternalServices();

const checkout = new CheckoutProcess("so-cart", service);

// Display subtotal, tax, shipping, total when page loads
checkout.displayTotals();

// Update shipping/totals after zip code entry
const zip = document.querySelector("#zip");

if (zip) {
  zip.addEventListener("blur", () => {
    checkout.displayTotals();
  });
}

// Checkout form submit
const form = document.forms.checkout;

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      // Send order to server
      await checkout.checkout(form);

      // Clear cart
      localStorage.removeItem("so-cart");

      // Clear form fields
      form.reset();

      // Hide checkout form and summary
      const checkoutLayout = document.querySelector(".checkout-layout");

      // Show success message
      const successMessage = document.querySelector("#checkout-success");

      if (checkoutLayout && successMessage) {
        checkoutLayout.classList.add("hide");
        successMessage.classList.remove("hide");
      }
    } catch (error) {
      alert(error.message);
    }
  });
}
