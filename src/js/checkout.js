import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import { alertMessage } from "./utils.mjs";
loadHeaderFooter();

const order = new CheckoutProcess("so-cart");
order.init();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document
    .querySelector("#zip")
    .addEventListener("blur", order.calcOrderTotal.bind(order));

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.forms[1];
    const status = form.checkValidity();
    form.reportValidity();
    if (status) {
        order.checkout();
        window.location.href = "status.html";
    }else{
        alertMessage("Please fill out all required fields.");
    }
});
