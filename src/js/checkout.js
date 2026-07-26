import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart");
order.init();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document
  .querySelector("#zip")
  .addEventListener("blur", order.calcOrderTotal.bind(order));

// listening for click on the button
document.forms["checkout"].addEventListener("submit", (e) => {
  e.preventDefault();

  order.checkout();
});
